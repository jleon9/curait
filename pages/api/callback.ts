// pages/api/callback.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import querystring from 'querystring';
import { tokens } from '@/lib/Tokens';

const client_id = process.env.SPOTIFY_ID;
const client_secret = process.env.SPOTIFY_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const stateKey = 'spotify_auth_state';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
    return;
  }

  res.setHeader('Set-Cookie', `${stateKey}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`);

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    data: querystring.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
    },
  };

  try {
    const { data } = await axios(authOptions);

    const access_token = data.access_token;
    const refresh_token = data.refresh_token;

    // Store tokens globally (in-memory storage for simplicity)
    tokens.tokens = { access_token, refresh_token, authorization_code: code };
    console.log(tokens.tokens)
    console.log("Endpoint Reached!");

    res.redirect('/#' + querystring.stringify({ access_token, refresh_token }));
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
  }
};
