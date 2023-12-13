// pages/api/spotifyAuth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import querystring from 'querystring';

const client_id = process.env.SPOTIFY_ID;
const client_secret = process.env.SPOTIFY_SECRET;
const redirect_uri = 'http://localhost:3000/'; // Update with your actual redirect URI

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // Step 1: Redirect to Spotify authorization URL
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email'; // Add any additional scopes your app needs
    const authorizationUrl = 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri,
        state,
      });

    res.redirect(authorizationUrl);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};

// Helper function to generate a random string
const generateRandomString = (length: number): string => {
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return randomString;
};
