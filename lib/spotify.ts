import axios from 'axios';

const getAccessToken = async () => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN + '';

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

// lib/spotify.js
export const topTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const createPlaylist = async () => {
  const { access_token } = await getAccessToken();
  return await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'New Playlist',
      description: 'New playlist description',
      public: false,
    }),
  });
};

export const getRecommendations = async (
  mood: string,
  genre: string,
  culture: string,
  includeSongs: boolean,
  includeInstrumentals: boolean
) => {
  const { access_token } = await getAccessToken();
  const apiUrl = 'https://api.spotify.com/v1/recommendations';
  const seedGenres = `${mood},${genre},${culture}`;
  let targetDanceability;
  let targetInstrumentalness;

  switch (mood) {
    case 'sleep':
      targetDanceability = 0;
    case 'chill':
      targetDanceability = 0.3;
    case 'dance':
      targetDanceability = 1;
    case 'hard':
      targetDanceability = 0.8;
  }

  switch (includeSongs || includeInstrumentals) {
    case includeSongs && !includeInstrumentals:
      targetInstrumentalness = 0;
    case !includeSongs && includeInstrumentals:
      targetInstrumentalness = 1;
    default:
      targetInstrumentalness = 0.5;
  }

  const url = `${apiUrl}?seed_genres=${seedGenres}&target_danceability=${targetDanceability}&target_instrumentalness=${targetInstrumentalness}`;

  const spotifyResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  });
  //console.log(spotifyResponse.json())
  return spotifyResponse;
};
