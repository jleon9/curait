// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
//import { tokens } from '../../lib/Tokens';

const client_id = process.env.SPOTIFY_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const stateKey = 'spotify_auth_state';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const state = Math.random().toString(36).substring(2);
  res.setHeader('Set-Cookie', `${stateKey}=${state}; Path=/`);

  const scope = 'playlist-modify-public playlist-modify-private';
  const params = new URLSearchParams();
  params.append('response_type', 'code');
  params.append('client_id', client_id as string);
  params.append('scope', scope);
  params.append('redirect_uri', redirect_uri as string);
  params.append('state', state);

  const authorizationUrl = 'https://accounts.spotify.com/authorize?' + params.toString();
  res.redirect(authorizationUrl);
};