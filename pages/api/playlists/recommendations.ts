// pages/api/playlists/recommendations.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getRecommendations } from '@/lib/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await getRecommendations("sleep", "rock", "pop", false, true);
      if (response.ok) {
        const playlistData = await response.json();
        res.status(200).json(playlistData);
      } else {
        // Handle errors
        const errorData = await response.json();
        res.status(response.status).json({ error: errorData });
      }
    } catch (error) {
      console.error('Error:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
