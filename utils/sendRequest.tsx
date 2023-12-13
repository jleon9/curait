import axios from 'axios';
import createPlaylist from './createPlaylist';

export default function sendRequest() {
  const client_id = process.env.SPOTIFY_ID;
  const client_secret = process.env.SPOTIFY_SECRET;
  const authToken = Buffer.from(client_id + ':' + client_secret).toString(
    'base64'
  );
  console.log(authToken)

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: 'Basic ' + authToken,
    },
    data: {
      grant_type: 'client_credentials',
    },
    responseType: 'json' as const,
  };

  axios
    .post(authOptions.url, null, {
      headers: authOptions.headers,
      params: authOptions.data,
      responseType: authOptions.responseType,
    })
    .then((response) => {
      if (response.status === 200) {
        const token = response.data.access_token;
        console.log(token);
        createPlaylist(token);
        return token;
      }
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error('Error creating playlist:', error.message);
        console.error('Status:', error.response?.status);
        console.error('Response data:', error.response?.data);
    } else {
        console.error('Unexpected error:', error);
    }
    });
}
