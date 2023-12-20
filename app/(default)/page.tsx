export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
};

import Hero from '@/components/hero';
import Newsletter from '@/components/newsletter';
import Zigzag from '@/components/zigzag';
import Testimonials from '@/components/testimonials';
import sendRequest from '@/utils/sendRequest';
import Playlist from '@/components/Playlist';
//import createPlaylist from '@/utils/createPlaylist';
import { tokens } from '@/lib/Tokens';

export default function Home() {
  
  console.log()
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
