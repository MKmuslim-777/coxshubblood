// ============================================
//   Cox's Hub Blood — /api/admin
//   GET  → all donors (auth required)
//   DELETE ?id=xxx → delete donor (auth required)
// ============================================

import { MongoClient, ObjectId } from 'mongodb';
import { verifyToken } from './login.js';

const uri = process.env.MONGODB_URI;
const DB  = 'chblood';
const COL = 'donors';

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
    if (!token) {
        res.status(401).json({ success: false, message: 'No token provided' });
        return null;
    }
    const payload = verifyToken(token);
    if (!payload) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
        return null;
    }
    return payload;
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(204).end();

    const user = authCheck(req, res);
    if (!user) return;

    try {
        const db  = await getDB();
        const col = db.collection(COL);

        // ── GET: সব donors ──
        if (req.method === 'GET') {
            const { blood, area, page = '1', limit = '50' } = req.query;
            const filter = {};
            if (blood && blood !== '') filter.blood = blood;
            if (area  && area  !== '') filter.area  = area;

            const pageNum  = Math.max(1, parseInt(page));
            const limitNum = Math.min(100, parseInt(limit));
            const skip     = (pageNum - 1) * limitNum;

            const [donors, total] = await Promise.all([
                col.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum).toArray(),
                col.countDocuments(filter),
            ]);

            return res.status(200).json({
                success: true,
                donors,
                total,
                page: pageNum,
                totalPages: Math.ceil(total / limitNum),
            });
        }

        // ── DELETE: donor সরাও ──
        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ success: false, message: 'ID required' });
            const result = await col.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0)
                return res.status(404).json({ success: false, message: 'Donor not found' });
            return res.status(200).json({ success: true, message: 'Donor deleted' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (err) {
        console.error('Admin API Error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error: ' + err.message });
    }
}
