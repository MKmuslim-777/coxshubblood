// ============================================
//   Cox's Hub Blood — /api/donors
//   GET  → সব donor list
//   POST → নতুন donor save
// ============================================

import { MongoClient } from 'mongodb';

const uri    = process.env.MONGODB_URI;
const DB     = 'chblood';
const COL    = 'donors';

let cachedClient = null;

async function getDB() {
    if (cachedClient) return cachedClient.db(DB);
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    cachedClient = client;
    return client.db(DB);
}

export default async function handler(req, res) {
    // CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin',  '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(204).end();
    }

    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const db  = await getDB();
        const col = db.collection(COL);

        // ---- GET: সব donor আনো ----
        if (req.method === 'GET') {
            const donors = await col
                .find({}, { projection: { _id: 0, name: 1, blood: 1, area: 1, phone: 1, lastDonation: 1 } })
                .sort({ createdAt: -1 })
                .limit(200)
                .toArray();
            return res.status(200).json({ success: true, donors });
        }

        // ---- POST: নতুন donor save ----
        if (req.method === 'POST') {
            const { name, blood, area, phone, lastDonation, permanentAddress, currentAddress, healthIssues } = req.body;

            // Basic validation
            if (!name || !blood || !phone) {
                return res.status(400).json({ success: false, message: 'name, blood এবং phone আবশ্যক।' });
            }

            const doc = {
                name:             name.trim(),
                blood:            blood.trim(),
                area:             (area || 'sadar').trim(),
                phone:            phone.trim(),
                lastDonation:     lastDonation     || null,
                currentAddress:   currentAddress   || '',
                permanentAddress: permanentAddress || '',
                healthIssues:     healthIssues     || '',
                createdAt:        new Date(),
            };

            await col.insertOne(doc);
            return res.status(201).json({ success: true, message: 'Donor registered successfully!' });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (err) {
        console.error('DB Error:', err.message);
        return res.status(500).json({ success: false, message: 'Server error: ' + err.message });
    }
}
