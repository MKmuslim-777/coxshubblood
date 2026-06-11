// ============================================
//   Cox's Hub Blood — /api/login
//   POST { username, password } → JWT token
// ============================================

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'anwersir777';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'MuslimCoxsHub';
const JWT_SECRET     = process.env.JWT_SECRET     || 'chblood_secret_2024';

// Minimal JWT — no external dependency needed
function base64url(str) {
    return Buffer.from(str).toString('base64')
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function createToken(payload) {
    const header  = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body    = base64url(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) }));
    const crypto  = require('crypto');
    const sig     = crypto.createHmac('sha256', JWT_SECRET)
                          .update(`${header}.${body}`)
                          .digest('base64url');
    return `${header}.${body}.${sig}`;
}

export function verifyToken(token) {
    try {
        const [header, body, sig] = token.split('.');
        const crypto = require('crypto');
        const expected = crypto.createHmac('sha256', JWT_SECRET)
                               .update(`${header}.${body}`)
                               .digest('base64url');
        if (sig !== expected) return null;
        const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
        // Check expiry (24 hours)
        if (Date.now() / 1000 - payload.iat > 86400) return null;
        return payload;
    } catch (_) {
        return null;
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

    // Constant-time comparison to prevent timing attacks
    const crypto = require('crypto');
    const uMatch = crypto.timingSafeEqual(
        Buffer.from(username), Buffer.from(ADMIN_USERNAME)
    );
    const pMatch = crypto.timingSafeEqual(
        Buffer.from(password), Buffer.from(ADMIN_PASSWORD)
    );

    if (!uMatch || !pMatch) {
        // Delay to slow brute force
        await new Promise(r => setTimeout(r, 800));
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = createToken({ role: 'admin', username });
    return res.status(200).json({ success: true, token });
}
