'use client';
import { useState } from 'react';
import Playlist from './Playlist';

const PlaylistParameters = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    mood: 'sleep',
    genre: 'afrobeat',
    culture: 'brazil',
    includeSongs: true,
    includeInstrumentals: false,
  });


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(formData)
    try {
      //console.log('123');
      const response = await fetch('/api/userInput/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        const data = await response.json();
        console.log("Server Response: ", data)

        setIsVisible(!isVisible);
        const res = await fetch('/api/playlists/newPlaylist');
        console.log(res.json());
        //console.log('123');
      } else {
        // Handle error
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div data-aos="fade-up" data-aos-delay="400">
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="p-3" htmlFor="userInput">
          Mood
        </label>
        <br />
        <select
          className="m-3 text-black"
          id="mood"
          name="mood"
          onChange={handleChange}
          value={formData.mood}
        >
          <option value="sleep">Sleep</option>
          <option value="chill">Chill</option>
          <option value="dance">Dance</option>
          <option value="hardstyle">Hard</option>
        </select>
        <br />
        <label className="p-3" htmlFor="userInput">
          Genre
        </label>
        <br />
        <select
          className="m-3 text-black"
          id="genre"
          name="genre"
          onChange={handleChange}
          value={formData.genre}
        >
          <option value="afrobeat">afrobeat</option>
          <option value="classical">classical</option>
          <option value="dancehall">dancehall</option>
          <option value="electro">electro</option>
          <option value="funk">funk</option>
          <option value="soul">soul</option>
          <option value="rock">rock</option>
          <option value="pop">pop</option>
          <option value="jazz">jazz</option>
          <option value="hip-hop">hip-hop</option>
        </select>
        <br />
        <label className="m-3" htmlFor="userInput">
          Culture
        </label>
        <br />
        <select
          className="m-3 text-black"
          id="culture"
          name="culture"
          onChange={handleChange}
          value={formData.culture}
        >
          <option value="brazil">brazil</option>
          <option value="british">british</option>
          <option value="french">french</option>
          <option value="indian">indian</option>
          <option value="iranian">iranian</option>
          <option value="latin">latin</option>
          <option value="malay">malay</option>
          <option value="swedish">swedish</option>
          <option value="turkish">turkish</option>
          <option value="world-music">Any Place</option>
        </select>
        <br />
        <br />
        <div className="flex items-strech">
          <p className="flex items-center">|</p>
          <label className="ml-3" htmlFor="songs">
            Songs
            <input
              className="m-3"
              type="checkbox"
              id="songs"
              name="songs"
              onChange={handleChange}
            />
            |
          </label>
          <br />
          <label className="ml-3" htmlFor="instrumentals">
            Instrumentals
            <input
              className="m-3"
              type="checkbox"
              id="instrumentals"
              name="instrumentals"
              onChange={handleChange}
            />
            |
          </label>
          <br />
        </div>
        <br />
        <div data-aos="fade-up" data-aos-delay="400">
          <button
            className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0"
            onClick={handleSubmit}
          >
            Generate
          </button>{' '}
          {isVisible && (
            <div className="pt-5">
              <Playlist />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PlaylistParameters;
