// ============================================
//   Cox's Hub Blood — /api/login
//   POST { username, password } → JWT token
//   Users collection থেকে verify করে
//   role === 'admin' হলেই dashboard access
// ============================================

import { MongoClient } from 'mongodb';
import crypto from 'crypto';

const uri        = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'chblood_secret_fallback';
const DB         = 'chblood';

let cachedClient = null;
async function getDB() {
    if (cachedClient) return cachedClient.db(DB);
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    cachedClient = client;
    return client.db(DB);
}

// SHA-256 hash (no bcrypt — zero dependency)
export function hashPassword(plain) {
    return crypto.createHash('sha256')
        .update(plain + JWT_SECRET)
        .digest('hex');
}

// Minimal JWT (no jsonwebtoken package needed)
function b64u(str) {
    return Buffer.from(str).toString('base64')
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function createToken(payload) {
    const header = b64u(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body   = b64u(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) }));
    const sig    = crypto.createHmac('sha256', JWT_SECRET)
                         .update(`${header}.${body}`)
                         .digest('base64url');
    return `${header}.${body}.${sig}`;
}

export function verifyToken(token) {
    try {
        const [header, body, sig] = token.split('.');
        const expected = crypto.createHmac('sha256', JWT_SECRET)
                               .update(`${header}.${body}`)
                               .digest('base64url');
        if (sig !== expected) return null;
        const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
        // 24 hour expiry
        if (Math.floor(Date.now() / 1000) - payload.iat > 86400) return null;
        return payload;
    } catch (_) { return null; }
}

// ── Seed first admin if users collection empty ──────────
async function seedAdminIfEmpty(col) {
    const count = await col.countDocuments();
    if (count === 0) {
        const adminUser = process.env.ADMIN_USERNAME || 'anwersir777';
        const adminPass = process.env.ADMIN_PASSWORD || 'MuslimCoxsHub';
        await col.insertOne({
            username:  adminUser,
            password:  hashPassword(adminPass),
            role:      'admin',
            name:      'Anwer Sir',
            createdAt: new Date(),
        });
        console.log('Default admin seeded.');
    }
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST')
        return res.status(405).json({ success: false, message: 'Method not allowed' });

    const { username, password } = req.body || {};
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'Username and password required' });

    try {
        const db  = await getDB();
        const col = db.collection('users');

        // Seed admin on first run
        await seedAdminIfEmpty(col);

        // Find user
        const user = await col.findOne({ username: username.trim() });

        if (!user) {
            await new Promise(r => setTimeout(r, 700)); // brute-force delay
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Verify password
        const hashed = hashPassword(password);
        if (user.password !== hashed) {
            await new Promise(r => setTimeout(r, 700));
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check role
        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied. Admin only.' });
        }

        const token = createToken({
            userId:   user._id.toString(),
            username: user.username,
            role:     user.role,
            name:     user.name || user.username,
        });

        return res.status(200).json({
            success: true,
            token,
            user: { username: user.username, name: user.name, role: user.role },
        });

    } catch (err) {
        console.error('Login error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
