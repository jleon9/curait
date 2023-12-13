export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
};

import Hero from '@/components/hero';
//import Features from '@/components/features'
import Newsletter from '@/components/newsletter';
import Zigzag from '@/components/zigzag';
import Testimonials from '@/components/testimonials';
import Token from '@/components/Token';
import sendRequest from '@/utils/sendRequest';
import Playlist from '@/components/Playlist';
import createPlaylist from '@/utils/createPlaylist';
//import app from '@/server/authorize';
//import authorize from '../api/spotifyAuth/route';

export default function Home() {
  return (
    <>
      <Hero />
      {}
      <Zigzag />
      {/*<Testimonials />*/}
      <Newsletter />
    </>
  );
}
