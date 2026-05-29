import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch('https://api.github.com/users/xplictly', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Uncomment and add token in Vercel Dashboard if rate limited:
        // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'GitHub API error' });
    }
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
