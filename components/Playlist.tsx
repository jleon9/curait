import React from 'react';
import { Spotify } from 'react-spotify-embed';
//import createPlaylist from '@/utils/createPlaylist';
import { tokens } from '@/lib/Tokens';

interface PlaylistProps {
  id: string
}

const Playlist = (playlistParams: PlaylistProps) => {
  const playlistLink = `https://open.spotify.com/playlist/${playlistParams.id}`
    return (
      <div>
        <Spotify link={playlistLink}/>
      </div>
    );
};

export default Playlist;
