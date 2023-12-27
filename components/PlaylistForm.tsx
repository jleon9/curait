'use client';
import { Suspense, useEffect, useState } from 'react';
import Playlist from './Playlist';
import { Spotify } from 'react-spotify-embed';

const PlaylistParameters = () => {
  async function getServerSideProps() {
    // Fetch data from an API or database
    const id = listId;

    return {
      props: {
        id,
      },
    };
  }

  let listId = '';
  const [isClicked, setIsClicked] = useState(false);
  const [playlistId, setPlaylistId] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playlistLink, setPlaylistLink] = useState('');
  const [formData, setFormData] = useState({
    mood: 'sleep',
    genre: 'afrobeat',
    culture: 'brazil',
    includeSongs: true,
    includeInstrumentals: false,
  });

  const resetToInitialState = () => {
    setIsClicked(false);
    setPlaylistId('');
    setIsVisible(false);
    setFormData({
      mood: 'sleep',
      genre: 'afrobeat',
      culture: 'brazil',
      includeSongs: true,
      includeInstrumentals: false,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    // Fetch data when the button is clicked
    if (isClicked && !isVisible) {
      setIsLoading(true);
      handleSubmit();
    }
  }, [isClicked, isVisible]);

  useEffect(() => {
    // Render the Spotify component once the link is available
    if (playlistLink && !isLoading) {
      setIsVisible(true);
    }
  }, [playlistLink, isLoading]);

  const handleClickGenerate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsClicked(!isClicked);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    //e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const formResponse = await fetch('/api/userInput/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (formResponse.ok) {
        const recommendedData = await formResponse.json();
        //console.log('Server Response: ', recommendedData);
        const newPlaylistResponse = await fetch('/api/playlists/newPlaylist');
        const newPlaylistData = await newPlaylistResponse.json();
        //console.log('New Playlist Data:', newPlaylistData);
        listId = newPlaylistData['id'] as string;

        const trackList = recommendedData.resultData.tracks;
        const trackUriList = trackList.map((track: any) => track.uri);
        //setAddTrackData({ uris: trackUriList, playlistId: listId });
        //console.log(JSON.stringify({ trackUriList, listId }))

        const updatePlaylist = await fetch('/api/playlists/addTracks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trackUriList, listId }),
        });
      } else {
        // Handle error
        console.error('Error:', formResponse.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setPlaylistId(listId);
    setPlaylistLink(`https://open.spotify.com/embed/playlist/${listId}`);
    setIsLoading(false);
    //setIsVisible(true);
  };

  return (
    <div data-aos="fade-up" data-aos-delay="400">
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="p-3" htmlFor="mood">
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
        <label className="p-3" htmlFor="genre">
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
        <label className="m-3" htmlFor="country">
          Country
        </label>
        <br />
        <select
          className="m-3 text-black"
          id="country"
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
            onClick={handleClickGenerate}
          >
            Generate
          </button>
          <button
            className="btn text-white bg-gray-600 hover:bg-gray-700 w-full mb-4 sm:w-auto sm:mb-0"
            onClick={resetToInitialState}
          >
            Clear
          </button>
        </div>
      </form>
      {!isLoading &&
      isClicked &&
      isVisible &&
      playlistId != '' &&
      playlistId &&
      playlistLink &&
      playlistLink != '' ? (
        <Suspense fallback={<div>Loading...</div>}>
          <iframe
            src={playlistLink}
            width="300"
            height="380"
            frameBorder="0"
            allow="encrypted-media"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </Suspense>
      ) : (
        <></>
      )}
      {isLoading && (
        <div>
          <br />
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
};

export default PlaylistParameters;
