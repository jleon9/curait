// pages/api/spotify-token.ts

import { NextApiRequest, NextApiResponse } from 'next';

// lib/spotifyApi.ts
import axios from 'axios';

export async function getSpotifyToken() {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': process.env.SPOTIFY_CLIENT_ID || '',
        'client_secret': process.env.SPOTIFY_CLIENT_SECRET || '',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200) {
      return response.data.access_token;
    } else {
      console.error('Error:', response.statusText);
      throw new Error('Failed to obtain Spotify token');
    }
  } catch (error) {
    console.error('Error:', "Unsuccessful Request");
    throw new Error('Internal server error');
  }
}
