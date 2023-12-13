
import axios from 'axios';

const createPlaylist = async (access_token: string) => {
  const uid = process.env.SPOTIFY_USER_ID;
  const apiUrl = 'https://api.spotify.com/v1/users/' + uid + '/playlists';
 
  const headers = {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json',
  };

  const data = {
    name: 'New Playlist',
    description: 'New playlist description',
    public: false,
  };

  try {
    const response = await axios.post(apiUrl, data, { headers });

    // Handle the response as needed
    console.log('Playlist created:', response.data);
  } catch (error: unknown) {
    // Handle errors
    console.error('Error creating playlist:', error);
  }
};

// Call the function
export default createPlaylist;
