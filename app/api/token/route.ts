// pages/api/spotify-token.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyToken } from '@/utils/getTokens';

export default async function POST(req: NextApiRequest) {
    try {
      // Make the Spotify API request
      const response = await getSpotifyToken();

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const data = await response.json();
        return response.status(200).json({ access_token: data.access_token });
      } else {
        console.error('Error:', response.statusText);
        response.status(response.status).json({ error: 'Failed to obtain Spotify token' });
      }
    } catch (error) {
      console.error('Error:', "Unsuccessful Request");
      //response.status(500).json({ error: 'Internal server error' });
    }
  }

