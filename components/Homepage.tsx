// components/HomePage.js
'use client'
import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [playlist, setPlaylist] = useState([]);

  const generatePlaylist = async () => {
    try {
      const response = await axios.get('/api/generatePlaylist');
      setPlaylist(response.data.playlist);
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Music AI Playlist Generator</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={generatePlaylist}
      >
        Generate Playlist
      </button>

      <div className="mt-8">
        {playlist.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Generated Playlist:</h2>
            <ul>
              {playlist.map((song, index) => (
                <li key={index} className="mb-2">
                  {song}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600">Click the button to generate a playlist.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
