// pages/api/submitForm.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { addTracks } from '@/lib/spotify';

export default async function handler(
  req: any,
  res: any
) {
  
  if (req.method === 'POST') {
      console.log('ID', req.body)

      // Access form data from req.body
      const { trackUriList, listId } = req.body;
      
      // Perform server-side logic using the form data
      const response = await addTracks(trackUriList, listId);
      const updatedPlaylist = await response.json()
      //console.log(updatedPlaylist)
      // Send a response back to the client
      res.status(200).json({ success: true, updatedPlaylist });
  } else {
    // Return an error for unsupported HTTP methods
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
