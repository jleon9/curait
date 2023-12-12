"use client"
import { useState } from 'react';
import Playlist from './Playlist';

const Generate = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
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
