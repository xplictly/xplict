import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  /* 
   * ADVANCED SECURITY GATEWAY
   * To add Cloudflare Turnstile or reCAPTCHA:
   * 1. Send the token from the client: const { token, ...formData } = req.body;
   * 2. Verify it here:
   * const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
   *   method: 'POST',
   *   body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
   *   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   * });
   * const outcome = await verify.json();
   * if (!outcome.success) return res.status(403).json({ error: 'Bot detected' });
   */

  try {
    const response = await fetch('https://formspree.io/f/mjvzppbe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Formspree relay error' });
    }
    
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
