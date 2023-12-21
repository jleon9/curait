// pages/api/submitForm.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getRecommendations } from '@/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Access form data from req.body
      const { mood, genre, culture, includeSongs, includeInstrumentals } =
        req.body;
      console.log(mood);
      // Perform server-side logic using the form data
      const result = await getRecommendations(
        mood,
        genre,
        culture,
        includeSongs,
        includeInstrumentals
      );
      // Use result.json() to extract JSON data from the response
      const resultData = await result.json();
      console.log(resultData);
      // Send a response back to the client
      res.status(200).json({ success: true, resultData });
    } catch (error) {
      console.error('Error:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    // Return an error for unsupported HTTP methods
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
