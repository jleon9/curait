'use client';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import DropdownArrow from './DropdownArrow';
import SpinnerWave from './Spinner';

// Style for Spotify embed container to ensure proper sizing and visibility of tracks
const spotifyEmbedStyles = `
  .spotify-embed-container {
    position: relative;
    width: 100%;
    height: 380px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .spotify-embed-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    border: 0;
  }
`;

// Configure EME and suppress specific warnings
const configureEME = () => {
  if (typeof window === 'undefined') return;

  // Handle Media Key System Access warnings
  if (window.navigator?.requestMediaKeySystemAccess) {
    const original = window.navigator.requestMediaKeySystemAccess;
    window.navigator.requestMediaKeySystemAccess = (keySystem, configs) => {
      const modifiedConfigs = (configs as MediaKeySystemConfiguration[]).map(
        (config) => ({
          ...config,
          audioCapabilities: config.audioCapabilities?.map((cap) =>
            cap.robustness ? cap : { ...cap, robustness: 'SW_SECURE_CRYPTO' }
          ),
          videoCapabilities: config.videoCapabilities?.map((cap) =>
            cap.robustness ? cap : { ...cap, robustness: 'SW_SECURE_CRYPTO' }
          ),
        })
      );
      return original.call(navigator, keySystem, modifiedConfigs);
    };
  }

  // Filter out third-party cookie warnings

  const originalWarn = console.warn;
  console.warn = (...args) => {
    const isCookieWarning = args.some(
      (arg) =>
        typeof arg === 'string' &&
        (arg.includes('third-party cookies') ||
          arg.includes('Chrome is moving towards'))
    );
    if (!isCookieWarning) originalWarn.apply(console, args);
  };
  return () => {
    console.warn = originalWarn;
  };
};

// Use dynamic import with explicit loading state and SSR disabled to prevent hydration issues
const Playlist = dynamic(() => import('../components/Playlist'), {
  loading: () => <p>Loading playlist...</p>,
  ssr: false, // Disable server-side rendering to prevent hydration mismatch
});

const PlaylistParameters = () => {
  // Consolidated state with initial values
  const [state, setState] = useState({
    isLoading: false,
    isVisible: false,
    playlistId: '',
    playlistLink: '',
    formData: {
      mood: 'sleep',
      genre: 'afrobeat',
      culture: 'brazil',
      includeSongs: true,
      includeInstrumentals: false,
    },
  });

  // Configure EME and warning suppressions on component mount
  useEffect(() => {
    // Run configuration and get cleanup function if any
    const cleanup = configureEME();
    return cleanup || undefined;
  }, []);

  // Fixed playlist ID - moved from inside function to constant
  const PLAYLIST_ID = '2cAg6cqWet493Zfkqk8X09';

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Update loading state
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Submit form data to API
      const formResponse = await fetch('/api/userInput/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(state.formData),
        credentials: 'same-origin', // Add credentials for proper cookie handling
      });

      if (formResponse.ok) {
        const recommendedData = await formResponse.json();

        // Process track data

        const trackUris: string[] = recommendedData.resultData.tracks.items.map(
          (track: any) => track.uri
        );

        const trackUriList = [...new Set(trackUris)]
          .sort(() => 0.5 - Math.random())
          .slice(0, 20);

        // Log tracks (useful for debugging but can be removed in production)
        console.debug('Generated playlist tracks:', trackUriList.length);

        try {
          // Add tracks to playlist - fixed CORS issues by removing no-cors mode
          const updateResponse = await fetch('/api/playlists/addTracks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Ensuring CORS headers are respected
              Accept: 'application/json',
            },
            body: JSON.stringify({
              trackUriList,
              listId: PLAYLIST_ID,
            }),
            credentials: 'same-origin', // Add credentials for proper cookie handling
          });

          if (!updateResponse.ok) {
            console.warn(
              'Warning: Playlist update response was not OK:',
              updateResponse.status
            );
          }
        } catch (updateError) {
          console.error('Error updating playlist:', updateError);
          // Continue with showing the playlist even if update fails
        }
      } else {
        console.error(
          'API response error:',
          formResponse.status,
          formResponse.statusText
        );
        throw new Error(`API responded with status: ${formResponse.status}`);
      }
    } catch (error) {
      console.error('Error generating playlist:', error);
      setState((prev) => ({ ...prev, isLoading: false }));
      alert(
        'Sorry, there was a problem generating your playlist. Please try again.'
      );
      return; // Don't proceed to show playlist if there was an error
    }

    // Update state with playlist information
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isVisible: true,
      playlistId: PLAYLIST_ID,
      playlistLink: `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}`,
    }));
  };

  // Handle form field changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
    }));
  };

  // Reset form and state
  const resetForm = () => {
    setState({
      isLoading: false,
      isVisible: false,
      playlistId: '',
      playlistLink: '',
      formData: {
        mood: 'sleep',
        genre: 'afrobeat',
        culture: 'brazil',
        includeSongs: true,
        includeInstrumentals: false,
      },
    });
  };

  // Select options organized as objects for maintainability
  const selectOptions = {
    moods: ['sleep', 'chill', 'energetic', 'hardstyle'],
    genres: [
      'afrobeat',
      'classical',
      'dancehall',
      'electro',
      'funk',
      'soul',
      'rock',
      'pop',
      'jazz',
      'hip-hop',
    ],
    countries: [
      'brazil',
      'british',
      'french',
      'indian',
      'iranian',
      'colombie',
      'malay',
      'swedish',
      'turkish',
      'world-music',
    ],
  };

  // Component to render select dropdown
  const SelectField = ({ label, name, options, value }: any) => (
    <div className="py-8">
      <label className="font-bold" htmlFor={name}>
        {label}
      </label>
      <div className="relative inline-block w-full mt-3">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-none focus:shadow-outline text-black"
          id={name}
          name={name}
          onChange={handleChange}
          value={value}
        >
          {options.map((option: any) => (
            <option key={option} value={option}>
              {option === 'world-music' ? 'Any Place' : option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
          <DropdownArrow />
        </div>
      </div>
    </div>
  );

  return (
    <main className="p-12">
      {/* Add styles to head for Spotify embed */}
      <style jsx global>
        {spotifyEmbedStyles}
      </style>

      <div
        className="grid justify-items-center"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <form className="grid content-center" onSubmit={handleSubmit}>
          <SelectField
            label="Mood"
            name="mood"
            options={selectOptions.moods}
            value={state.formData.mood}
          />

          <SelectField
            label="Genre"
            name="genre"
            options={selectOptions.genres}
            value={state.formData.genre}
          />

          <SelectField
            label="Country"
            name="culture"
            options={selectOptions.countries}
            value={state.formData.culture}
          />

          <div
            className="grid grid-cols-2 gap-8 mb-12"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <button
              type="submit"
              className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0"
            >
              Generate
            </button>
            <button
              type="button"
              className="btn text-white bg-gray-600 hover:bg-gray-700 w-full mb-4 sm:w-auto sm:mb-0"
              onClick={resetForm}
            >
              Clear
            </button>
          </div>
        </form>

        {/* Playlist display logic with error handling */}
        {state.isLoading ? (
          <SpinnerWave message={'Loading your playlist...'} />
        ) : state.isVisible && state.playlistLink ? (
          <div className="mt-8 w-full max-w-xl">
            <Suspense
              fallback={<SpinnerWave message={'Loading playlist player...'} />}
            >
              <div
                className="spotify-embed-container"
                style={{ height: '380px', width: '100%' }}
              >
                <Playlist playlistLink={state.playlistLink} />
              </div>
            </Suspense>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default PlaylistParameters;
