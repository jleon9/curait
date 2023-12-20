// pages/home.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Hero from '@/components/hero'; // import your components as needed
import Zigzag from '@/components/zigzag';
import Newsletter from '@/components/newsletter';
import createPlaylist from '@/utils/createPlaylist';
import { tokens } from '@/lib/Tokens';

interface HomeProps {
    access_token?: string;
    refresh_token?: string;
    authorization_code?: string;
  }

const Home = ({access_token, refresh_token, authorization_code}: HomeProps) => {
  const router = useRouter();

  useEffect(() => {
    // Check if the tokens are present
    //console.log(access_token)
    if (access_token) {
        
        // Do something with the tokens, for example, create a playlist
        createPlaylist(access_token);
    }
  }, [access_token]);

  return (
    <>
      <Hero />
      {/* Render other components as needed */}
      <Zigzag />
      
      <Newsletter />
    </>
  );
};

export default Home;
