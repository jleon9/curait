// pages/api/spotifyAuthCallback.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import querystring from 'querystring';
import createPlaylist from '@/utils/createPlaylist';

const client_id = process.env.SPOTIFY_ID;
const client_secret = process.env.SPOTIFY_SECRET;
const redirect_uri = 'http://localhost:3000/'; // Update with your actual redirect URI

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { code, state } = req.query;

    // Step 2: Verify state to prevent CSRF attacks
    const storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;
    if (state === null || state !== storedState) {
      res.status(401).json({ error: 'Invalid state' });
      return;
    }

    // Step 3: Exchange authorization code for access token
    const tokenResponse = await exchangeCodeForToken(code as string);
    if (tokenResponse.error) {
      res.status(400).json({ error: tokenResponse.error_description });
      return;
    }

    const { access_token, refresh_token } = tokenResponse;
    // Store or use access_token and refresh_token as needed

    res.status(200).json({ access_token, refresh_token });
    console.log(res);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

// Helper function to exchange authorization code for access token
const exchangeCodeForToken = async (code: string): Promise<any> => {
  const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  const basicAuthHeader = `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`;

  try {
    const response = await axios.post(
      tokenEndpoint,
      querystring.stringify({
        code,
        redirect_uri,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: basicAuthHeader,
        },
      }
    );

    return response.data;
  } catch (error) {
    return { error: 'invalid_grant', error_description: 'Invalid authorization code' };
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
