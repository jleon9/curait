// pages/your-page.tsx
import { useEffect, useState } from 'react';

const Token = () => {
  const [spotifyToken, setSpotifyToken] = useState<string>('');

  useEffect(() => {
    // Call the API route to get the Spotify token
    fetch('/api/token')
      .then(response => response.json())
      .then(data => setSpotifyToken(data.spotifyToken))
      .catch(error => console.error('Error:', error));
  }, []);
};

export default Token;
