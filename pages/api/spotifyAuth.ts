// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';
//import { tokens } from '../../lib/Tokens';

const client_id = process.env.SPOTIFY_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const stateKey = 'spotify_auth_state';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const state = Math.random().toString(36).substring(2);
  res.setHeader('Set-Cookie', `${stateKey}=${state}; Path=/`);

  const scope = 'user-read-private user-read-email';
  const authorizationUrl =
    'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    });
  res.redirect(authorizationUrl);
};
