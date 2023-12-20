import React from 'react';
import { Spotify } from 'react-spotify-embed';
//import createPlaylist from '@/utils/createPlaylist';
import { tokens } from '@/lib/Tokens';

const Playlist = () => {
  
    return (
      <div>
        <Spotify link="https://open.spotify.com/playlist/1iktniobPRRpPtjiV3QJv0" />
      </div>
    );
};

export default Playlist;
