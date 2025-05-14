"use client";
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { tokens } from '@/lib/Tokens';

const client_id = process.env.SPOTIFY_ID;
const client_secret = process.env.SPOTIFY_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const stateKey = 'spotify_auth_state';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    return;
  }

  // Clear Cookie
  res.setHeader('Set-Cookie', `${stateKey}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`);

  const params = new URLSearchParams();
  params.append('code', code as string);
  params.append('redirect_uri', redirect_uri as string);
  params.append('grant_type', 'authorization_code');

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    data: params.toString(),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
    },
  };

  try {
    const { data } = await axios(authOptions);

    const access_token = data.access_token;
    const refresh_token = data.refresh_token;
    const authorization_code = code;
    tokens.tokens = { access_token, refresh_token, authorization_code };

    res.setHeader(
      'Set-Cookie',
      `access_token=${encodeURIComponent(access_token)}; HttpOnly; Secure; SameSite=Strict`
    );
    console.log(Buffer.from(`${client_id}:${client_secret}`).toString('base64'));

    console.log(tokens.tokens);

    res.redirect('/');

  } catch (error) {
    console.error('Error getting tokens:', error);
    const errorParams = new URLSearchParams();
    errorParams.append('error', 'invalid_token');
    res.redirect('/#' + errorParams.toString());
  }
};