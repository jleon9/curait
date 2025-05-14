/**
 * Gets all available genre seeds from Spotify API
 * @returns Promise with the list of available genres
 */
export const getAvailableGenres = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    'https://api.spotify.com/v1/recommendations/available-genre-seeds',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.json(); // Returns { genres: string[] }
};

const getAccessToken = async () => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN + '';

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const getRecommendations = async (
  mood: string,
  genre: string,
  culture: string,
  includeSongs: boolean,
  includeInstrumentals: boolean
) => {
  const { access_token } = await getAccessToken();
  console.log(access_token);

  // Use the search endpoint instead of recommendations
  const apiUrl = 'https://api.spotify.com/v1/search';

  // Build query components based on parameters
  let queryParts = [];

  // Collect all genres including culture and mood-related genres
  let allGenres = [];

  // Add culture as a genre (this is important for the recommendations)
  if (culture && culture.trim()) {
    allGenres.push(culture.trim());
  }

  // Map mood to potential genre terms
  if (mood) {
    switch (mood) {
      case 'sleep':
        allGenres.push('ambient', 'sleep');
        break;
      case 'chill':
        allGenres.push('chill', 'lounge');
        break;
    }
  }

  // // Format all genres as a combined query if we have any
  if (allGenres.length > 0) {
    const genreQuery = 'genre:' + genre;
    queryParts.push(`(${genreQuery})`);
  }

  if (includeInstrumentals) {
    // Only instrumentals
    queryParts.push('instrumental');
  }

  // Add culture as a keyword for broader matching beyond just genres
  if (culture) {
    queryParts.push(culture);
  }

  // Add mood as a keyword for broader matching beyond just genres
  if (mood) {
    queryParts.push(mood);
  }

  // Add genres as a keyword for broader matching beyond just genres
  if (genre) {
    queryParts.push(genre);
  }

  // Combine all query parts
  const query = queryParts.join(' ');

  // Set limit for results
  const limit = 20;

  // Build the URL with appropriate parameters
  let url = `${apiUrl}?q=${encodeURIComponent(
    query
  )}&type=track&limit=${limit}&include_external=audio`;

  // Add additional parameters based on mood
  // Note: Search API doesn't directly support target_danceability, target_energy, etc.,
  // but we can add relevant terms to the search query based on the mood

  const spotifyResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  });

  return spotifyResponse;
};

export const addTracks = async (uris: string[], playlistId: string) => {
  const { access_token } = await getAccessToken();

  // Step 1: Empty the playlist first
  const deleteUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  // Get current tracks to create the tracks array for deletion
  const getTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track(uri))`;
  const currentTracksResponse = await fetch(getTracksUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  });

  const currentTracks = await currentTracksResponse.json();

  // If there are tracks in the playlist, remove them
  if (currentTracks.items && currentTracks.items.length > 0) {
    // Format tracks for deletion as required by the API
    const tracksToDelete = {
      tracks: currentTracks.items.map((item: any) => ({ uri: item.track.uri })),
    };

    // Delete all tracks from the playlist
    await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tracksToDelete),
    });
  }

  // Step 2: Add the new tracks to the playlist
  const addUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const requestBody = {
    uris: uris,
    position: 0,
  };

  return fetch(addUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
};
