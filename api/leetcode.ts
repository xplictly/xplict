import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch('https://alfa-leetcode-api.onrender.com/xplictly/solved', {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'LeetCode API error' });
    }
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
