"use client"
import { useState } from 'react';
import Playlist from './Playlist';
import { useRouter } from 'next/router';

const Generate = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = async() => {
    const res = await fetch('/api/playlists/newPlaylist')
    console.log(res.json())
    setIsVisible(!isVisible);
    try {

      // Now you can use the access_token as needed
    } catch (error) {
      console.error('Error fetching access token:', error);
    }

  };
  

  return (
    <div data-aos="fade-up" data-aos-delay="400">
      <button
        className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0"
        onClick={handleClick}
      >
        Generate
      </button>
      {' '}
      {isVisible && <div className="pt-5"><Playlist/></div>}
    </div>
  );
};

export default Generate;
