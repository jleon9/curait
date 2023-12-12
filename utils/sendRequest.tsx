import axios from 'axios'; 
 

export default function sendRequest() {
  const client_id = process.env.SPOTIFY_ID;
  const client_secret = process.env.SPOTIFY_SECRET;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret).toString('base64'),
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
        console.log(token); // You can use the token as needed
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
