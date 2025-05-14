// pages/api/userInput/submitForm.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getRecommendations } from '@/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { mood, genre, culture, includeSongs, includeInstrumentals } =
        req.body;
      console.log('Received form data:', req.body);

      const result = await getRecommendations(
        mood,
        genre,
        culture,
        includeSongs,
        includeInstrumentals
      );

      // Log the raw response before attempting to parse JSON
      console.log('Raw recommendation result:', result);

      const resultData = await result.json();
      console.log(
        'Parsed recommendation data:',
        JSON.stringify(
          resultData.tracks.items.map((data: any) => data.external_urls.spotify),
          null,
          2
        )
      );

      res.status(200).json({ success: true, resultData });
    } catch (error) {
      console.error('Error in /api/userInput/submitForm:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
