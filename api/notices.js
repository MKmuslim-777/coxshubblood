// ============================================
//   Cox's Hub Blood — /api/notices
//   GET → active notices for homepage
// ============================================

import { MongoClient } from 'mongodb';

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

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'GET')
        return res.status(405).json({ success: false, message: 'Method not allowed' });

    try {
        const db      = await getDB();
        const notices = await db.collection('notices')
            .find({ active: true })
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray();

        return res.status(200).json({ success: true, notices });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
