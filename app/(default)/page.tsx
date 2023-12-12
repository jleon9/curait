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
import getTrackInfo, { getToken } from '@/server/auth';
import sendRequest from '@/utils/sendRequest';
import Playlist from '@/components/Playlist';

export default function Home() {
  return (
    <>
      <Hero />
      {console.log(sendRequest())}
      <Zigzag />
      {/*<Testimonials />*/}
      <Newsletter />
    </>
  );
}
