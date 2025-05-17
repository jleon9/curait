# ✨ Your Personalized Spotify Playlist Generator ✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Next.js](https://img.shields.io/badge/Next.js-v14+-blueviolet)
![Spotify API](https://img.shields.io/badge/Spotify%20API-Powered-green)

Create the perfect Spotify playlist tailored to your mood, preferred genre, and even cultural vibes! This application uses the power of the Spotify API to curate a selection of tracks that match your specified parameters and adds them to a predefined Spotify playlist.

## 🚀 Features

* **Mood Selection:** Choose from a range of moods like sleep, chill, energetic, and hardstyle to set the overall tone of your playlist.
* **Genre Preference:** Explore a diverse selection of genres, from Afrobeat to Hip-Hop, to find the music you love.
* **Cultural Inspiration:** Immerse yourself in the sounds of different cultures, including Brazil, British, French, Indian, and many more. Can't decide? Select "Any Place" for a global mix!
* **Dynamic Playlist Updates:** The app intelligently fetches relevant tracks based on your choices and adds them to a specific Spotify playlist (currently set to a predefined ID).
* **Loading State:** A visual spinner keeps you informed while your personalized playlist is being generated.
* **Clear and Reset:** Easily clear your selections and start fresh with the "Clear" button.
* **Responsive Design:** Enjoy a seamless experience on various screen sizes.

## 🛠️ Technologies Used

* **Next.js:** A powerful React framework for building server-rendered and static web applications.
* **React:** A JavaScript library for building user interfaces.
* **Spotify Web API:** Used to fetch track recommendations and interact with Spotify playlists.
* **`next/dynamic`:** For client-side rendering of the playlist embed component to avoid hydration issues.
* **`fetch` API:** For making HTTP requests to our backend API routes.
* **Tailwind CSS:** (Implicit from the component styling) A utility-first CSS framework for rapid UI development.

## ⚙️ Setup and Usage

While this README focuses on the frontend component, keep in mind that this application relies on backend API routes (`/api/userInput/submitForm` and `/api/playlists/addTracks`) to interact with the Spotify API.

To run the frontend part of this application (assuming you have the backend set up and Next.js environment configured):

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jleon9/curait
    cd curait
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    yarn run dev
    ```

4.  **Open your browser** and navigate to `http://localhost:3000` (or the port your development server is running on).

5.  **Interact with the Playlist Generator:**
    * Select your desired mood from the dropdown.
    * Choose your preferred genre.
    * Pick a cultural vibe that resonates with you.
    * Click the "Generate" button.

6.  **View Your Updated Playlist:** Once the process is complete, an embedded Spotify player will appear, showcasing the tracks added to the playlist with the ID `'2cAg6cqWet493Zfkqk8X09'`.

## ⚠️ Important Notes

* **Backend Configuration:** This frontend component heavily relies on the correct implementation and running of the backend API routes (`/api/userInput/submitForm` and `/api/playlists/addTracks`). Ensure these endpoints are properly set up to handle form submissions and interact with the Spotify API (including authentication and authorization).
* **Predefined Playlist ID:** The current implementation adds tracks to a specific, hardcoded Spotify playlist ID (`'2cAg6cqWet493Zfkqk8X09'`). To make this application more versatile, you might consider allowing users to specify their own playlist or creating new playlists dynamically.
* **Error Handling:** The component includes basic error handling for API requests. Consider implementing more robust error feedback and logging for a better user experience.
* **Rate Limiting:** Be mindful of the Spotify API rate limits in your backend implementation to ensure the application functions reliably.
* **Styling:** The component uses inline styles and likely benefits from a more comprehensive styling solution (like Tailwind CSS as hinted in the code) for consistency and maintainability.

## 🤝 Contributing

Contributions to improve this Spotify playlist generator are welcome! Feel free to fork the repository and submit pull requests with your enhancements.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Enjoy Your Personalized Music! 🎉
