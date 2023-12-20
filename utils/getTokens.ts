import axios from 'axios';

const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI + "";

export const getToken = async (code: string) => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const authHeader = `Basic ${Buffer.from(
    `${SPOTIFY_ID}:${SPOTIFY_SECRET}`
  ).toString('base64')}`;
  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: SPOTIFY_REDIRECT_URI
  });

  const config = {
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(tokenUrl, data, config);
    const { access_token, refresh_token, expires_in } = response.data;
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    console.log('Expires In:', expires_in);

    // Store tokens securely in your application (e.g., database or session storage)
    // Set up a mechanism to refresh the access token before it expires
  } catch (error: any) {
    console.error('Error getting tokens:', error);
  }
};

export const refreshToken = async (refreshToken: string) => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const authHeader = `Basic ${Buffer.from(
    `${SPOTIFY_ID}:${SPOTIFY_SECRET}`
  ).toString('base64')}`;
  const data = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const config = {
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(tokenUrl, data, config);
    const { access_token, expires_in } = response.data;
    console.log('New Access Token:', access_token);

    // Update the stored access token with the new one
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
};

// Example usage:
// Assuming you have the authorization code from the user's login

const authorizationCode = 'user-authorization-code';
getToken(authorizationCode);

// If the access token expires, you can use the refresh token to get a new one
// const storedRefreshToken = 'stored-refresh-token';
// refreshToken(storedRefreshToken);
