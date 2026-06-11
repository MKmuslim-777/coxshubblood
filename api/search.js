// ============================================
//   Cox's Hub Blood — /api/search
//   GET ?blood=O%2B&area=sadar
// ============================================

import { MongoClient } from 'mongodb';

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

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin',  '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(204).end();
    }

    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { blood, area } = req.query;

        // Build filter
        const filter = {};
        if (blood && blood !== '') filter.blood = blood;
        if (area  && area  !== '') filter.area  = area;

        const db     = await getDB();
        const col    = db.collection(COL);
        const donors = await col
            .find(filter, { projection: { _id: 0, name: 1, blood: 1, area: 1, phone: 1, lastDonation: 1 } })
            .sort({ createdAt: -1 })
            .limit(50)
            .toArray();

        return res.status(200).json({ success: true, donors });

    } catch (err) {
        console.error('Search Error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error: ' + err.message });
    }
}
