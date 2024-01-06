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

export const createPlaylist = async () => {
  const { access_token } = await getAccessToken();
  return await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Curaited For You',
      description: 'Created with Curait',
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
  const seedGenres = `${culture},${genre},${mood},`;
  let targetDanceability;
  let targetEnergy;
  let targetInstrumentalness;
  let market = null;

  switch (mood) {
    case 'sleep':
      targetDanceability = 0;
      targetEnergy = 0;
    case 'chill':
      targetDanceability = 0.3;
      targetEnergy = 0.3;
    case 'dance':
      targetDanceability = 1;
      targetEnergy = 0.9;
    case 'hardstyle':
      targetDanceability = 0.9;
      targetEnergy = 1;
  }

  switch (includeSongs || includeInstrumentals) {
    case includeSongs && !includeInstrumentals:
      targetInstrumentalness = 0;
    case !includeSongs && includeInstrumentals:
      targetInstrumentalness = 1;
    default:
      targetInstrumentalness = 0.5;
  }

  switch (culture) {
    case 'brazil':
      market = 'BR';
    case 'british':
      market = 'GB';
    case 'french':
      market = 'FR';
    case 'indian':
      market = 'IN';
    case 'iranian':
      market = 'IR';
    case 'latin':
      market = 'CO';
    case 'malay':
      market = 'MY';
    case 'swedish':
      market = 'SE';
    case 'turkish':
      market = 'TR';
    default:
      market = null;
  }

  const url = market
    ? `${apiUrl}?market=${market}&ESseed_genres=${seedGenres}&target_danceability=${targetDanceability}&target_energy=${targetEnergy}&target_instrumentalness=${targetInstrumentalness}`
    : `${apiUrl}?seed_genres=${seedGenres}&target_danceability=${targetDanceability}&target_energy=${targetEnergy}&target_instrumentalness=${targetInstrumentalness}`;

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

export const addTracks = async (uris: ['string'], playlistId: string) => {
  const { access_token } = await getAccessToken();
  const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const requestBody = {
    uris: uris,
    position: 0,
  };

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
};
