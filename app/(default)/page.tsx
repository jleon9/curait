export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
};
import PlaylistForm from '@/components/PlaylistForm';
//import Playlist from '@/components/Playlist';
//import createPlaylist from '@/utils/createPlaylist';
import { tokens } from '@/lib/Tokens';

export default function Home() {
  //console.log()
  return (
    <>
      <PlaylistForm />
    </>
  );
}
