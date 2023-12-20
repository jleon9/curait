import { createPlaylist } from '@/lib/spotify';
import axios from 'axios';


export default async function handler(req, res) {
  try {
    const response = await createPlaylist();
    if (response.ok) {
      const playlistData = await response.json();
      res.status(200).json(playlistData);
      
    } else {
      // Handle errors
      const errorData = await response.json();
      res.status(response.status).json({ error: errorData });
    }
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
