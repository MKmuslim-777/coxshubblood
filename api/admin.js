// ============================================
//   Cox's Hub Blood — /api/admin
//   Protected: admin role only
//
//   Donors:
//     GET    /api/admin?col=donors          → list
//     POST   /api/admin?col=donors          → add
//     PUT    /api/admin?col=donors&id=xxx   → update
//     DELETE /api/admin?col=donors&id=xxx   → delete
//
//   Notices:
//     GET    /api/admin?col=notices         → list
//     POST   /api/admin?col=notices         → add
//     PUT    /api/admin?col=notices&id=xxx  → update/toggle
//     DELETE /api/admin?col=notices&id=xxx  → delete
//
//   Users:
//     GET    /api/admin?col=users           → list
//     POST   /api/admin?col=users           → add
//     DELETE /api/admin?col=users&id=xxx    → delete
// ============================================

import { MongoClient, ObjectId } from 'mongodb';
import { verifyToken, hashPassword } from './login.js';

const uri = process.env.MONGODB_URI;
const DB  = 'chblood';

let cachedClient = null;
async function getDB() {
    if (cachedClient) return cachedClient.db(DB);
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    cachedClient = client;
    return client.db(DB);
}

function authCheck(req, res) {
    const auth  = req.headers['authorization'] || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) { res.status(401).json({ success: false, message: 'No token' }); return null; }
    const payload = verifyToken(token);
    if (!payload) { res.status(401).json({ success: false, message: 'Invalid/expired token' }); return null; }
    if (payload.role !== 'admin') { res.status(403).json({ success: false, message: 'Admin only' }); return null; }
    return payload;
}

function toObjId(id) {
    try { return new ObjectId(id); } catch (_) { return null; }
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(204).end();

    const user = authCheck(req, res);
    if (!user) return;

    const { col = 'donors', id, page = '1', limit = '50', blood, area } = req.query;

    // Only allow these collections
    if (!['donors', 'notices', 'users'].includes(col)) {
        return res.status(400).json({ success: false, message: 'Invalid collection' });
    }

    try {
        const db         = await getDB();
        const collection = db.collection(col);

        // ══════════════════════════════════════
        //  GET — list items
        // ══════════════════════════════════════
        if (req.method === 'GET') {
            const filter = {};
            if (col === 'donors') {
                if (blood && blood !== '') filter.blood = blood;
                if (area  && area  !== '') filter.area  = area;
            }
            const pageNum  = Math.max(1, parseInt(page));
            const limitNum = Math.min(100, parseInt(limit));
            const skip     = (pageNum - 1) * limitNum;

            const projection = col === 'users'
                ? { password: 0 }   // never return passwords
                : {};

            const [items, total] = await Promise.all([
                collection.find(filter, { projection })
                    .sort({ createdAt: -1 })
                    .skip(skip).limit(limitNum)
                    .toArray(),
                collection.countDocuments(filter),
            ]);

            return res.status(200).json({
                success: true,
                [col]: items,
                total,
                page: pageNum,
                totalPages: Math.ceil(total / limitNum),
            });
        }

        // ══════════════════════════════════════
        //  POST — add new item
        // ══════════════════════════════════════
        if (req.method === 'POST') {
            const body = req.body || {};

            if (col === 'donors') {
                const { name, blood: bg, area: ar, phone, lastDonation,
                        currentAddress, permanentAddress, healthIssues } = body;
                if (!name || !bg || !phone)
                    return res.status(400).json({ success: false, message: 'name, blood, phone required' });
                const doc = {
                    name: name.trim(), blood: bg.trim(),
                    area: (ar || 'sadar').trim(), phone: phone.trim(),
                    lastDonation: lastDonation || null,
                    currentAddress: currentAddress || '',
                    permanentAddress: permanentAddress || '',
                    healthIssues: healthIssues || '',
                    createdAt: new Date(), addedBy: user.username,
                };
                const result = await collection.insertOne(doc);
                return res.status(201).json({ success: true, id: result.insertedId });
            }

            if (col === 'notices') {
                const { title, message, type = 'info', active = true } = body;
                if (!title || !message)
                    return res.status(400).json({ success: false, message: 'title and message required' });
                const doc = {
                    title: title.trim(), message: message.trim(),
                    type,   // 'info' | 'warning' | 'danger' | 'success'
                    active: Boolean(active),
                    createdAt: new Date(), createdBy: user.username,
                };
                const result = await collection.insertOne(doc);
                return res.status(201).json({ success: true, id: result.insertedId });
            }

            if (col === 'users') {
                const { username: uname, password: upass, name: uname2, role = 'user' } = body;
                if (!uname || !upass)
                    return res.status(400).json({ success: false, message: 'username and password required' });
                const exists = await collection.findOne({ username: uname.trim() });
                if (exists)
                    return res.status(409).json({ success: false, message: 'Username already exists' });
                const doc = {
                    username: uname.trim(),
                    password: hashPassword(upass),
                    name:     (uname2 || uname).trim(),
                    role:     ['admin','user'].includes(role) ? role : 'user',
                    createdAt: new Date(), createdBy: user.username,
                };
                await collection.insertOne(doc);
                return res.status(201).json({ success: true });
            }
        }

        // ══════════════════════════════════════
        //  PUT — update item
        // ══════════════════════════════════════
        if (req.method === 'PUT') {
            if (!id) return res.status(400).json({ success: false, message: 'id required' });
            const _id  = toObjId(id);
            if (!_id)  return res.status(400).json({ success: false, message: 'Invalid id' });
            const body = req.body || {};

            let update = {};

            if (col === 'donors') {
                const { name, blood: bg, area: ar, phone, lastDonation,
                        currentAddress, permanentAddress, healthIssues } = body;
                update = {
                    ...(name             && { name: name.trim() }),
                    ...(bg               && { blood: bg.trim() }),
                    ...(ar               && { area: ar.trim() }),
                    ...(phone            && { phone: phone.trim() }),
                    ...(lastDonation     && { lastDonation }),
                    ...(currentAddress   !== undefined && { currentAddress }),
                    ...(permanentAddress !== undefined && { permanentAddress }),
                    ...(healthIssues     !== undefined && { healthIssues }),
                    updatedAt: new Date(), updatedBy: user.username,
                };
            }

            if (col === 'notices') {
                const { title, message, type, active } = body;
                update = {
                    ...(title   !== undefined && { title: title.trim() }),
                    ...(message !== undefined && { message: message.trim() }),
                    ...(type    !== undefined && { type }),
                    ...(active  !== undefined && { active: Boolean(active) }),
                    updatedAt: new Date(),
                };
            }

            if (col === 'users') {
                const { name: uname2, role, password: newPass } = body;
                update = {
                    ...(uname2  && { name: uname2.trim() }),
                    ...(role && ['admin','user'].includes(role) && { role }),
                    ...(newPass && { password: hashPassword(newPass) }),
                    updatedAt: new Date(),
                };
                // Prevent removing own admin role
                if (role === 'user') {
                    const target = await collection.findOne({ _id });
                    if (target?.username === user.username)
                        return res.status(400).json({ success: false, message: 'Cannot demote yourself' });
                }
            }

            const result = await collection.updateOne({ _id }, { $set: update });
            if (result.matchedCount === 0)
                return res.status(404).json({ success: false, message: 'Not found' });
            return res.status(200).json({ success: true });
        }

        // ══════════════════════════════════════
        //  DELETE — remove item
        // ══════════════════════════════════════
        if (req.method === 'DELETE') {
            if (!id) return res.status(400).json({ success: false, message: 'id required' });
            const _id = toObjId(id);
            if (!_id) return res.status(400).json({ success: false, message: 'Invalid id' });

            // Prevent self-delete
            if (col === 'users') {
                const target = await collection.findOne({ _id });
                if (target?.username === user.username)
                    return res.status(400).json({ success: false, message: 'Cannot delete yourself' });
            }

            const result = await collection.deleteOne({ _id });
            if (result.deletedCount === 0)
                return res.status(404).json({ success: false, message: 'Not found' });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (err) {
        console.error('Admin API error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error: ' + err.message });
    }
}
