// pages/api/submitForm.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { addTracks } from '@/lib/spotify';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    console.log('ID', req.body);

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
      res.setHeader('Access-Control-Allow-Origin', '*'); // Or your specific frontend origin
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
      );

      return response.json();
    };

    // Access form data from req.body
    const { trackUriList, listId } = req.body;

    // Perform server-side logic using the form data
    const response = await addTracks(trackUriList, listId);
    const updatedPlaylist = await response.json();
    //console.log(updatedPlaylist)
    // Send a response back to the client
    res.status(200).json({ success: true, updatedPlaylist });
  } else {
    // Return an error for unsupported HTTP methods
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
