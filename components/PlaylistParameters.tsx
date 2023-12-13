const PlaylistParameters = () => {
  return (
    <div data-aos="fade-up" data-aos-delay="400">
      <form>
        <label className="p-3" htmlFor="userInput">
          Mood
        </label>
        <br />
        <input
          className="text-black"
          type="text"
          id="userInput"
          name="userInput"
          placeholder="Choose a Mood..."
        />
        <br />
        <br />
        <label className="p-3" htmlFor="userInput">
          Genre
        </label>
        <br />
        <input
          className="text-black"
          type="text"
          id="userInput"
          name="userInput"
          placeholder="Choose a Genre..."
        />
        <br />
        <br />
        <label className="p-3" htmlFor="userInput">
          Country
        </label>
        <br />
        <input
          className="text-black"
          type="text"
          id="userInput"
          name="userInput"
          placeholder="Choose a Country..."
        />
        <br />
        <br />
        <label className="p-3" htmlFor="userInput">
          Language
        </label>
        <br />
        <input
          className="text-black"
          type="text"
          id="userInput"
          name="userInput"
          placeholder="Choose a Language..."
        />
      </form>
      <br />
      <form className="flex items-strech">
        <p className="flex items-center">|</p>
        <label className="ml-3" htmlFor="checkbox1">
          Songs
          <input
            className="m-3"
            type="checkbox"
            id="checkbox1"
            name="checkbox1"
          />
          |
        </label>
        <br />
        <label className="ml-3" htmlFor="checkbox1">
          Instrumentals
          <input
            className="m-3"
            type="checkbox"
            id="checkbox1"
            name="checkbox1"
          />
          |
        </label>
        <br />
        <label className="ml-3" htmlFor="checkbox1">
          Acapellas
          <input
            className="m-3"
            type="checkbox"
            id="checkbox1"
            name="checkbox1"
          />
          |
        </label>
        <br />
        <label className="ml-3" htmlFor="checkbox1">
          Anything
          <input
            className="m-3"
            type="checkbox"
            id="checkbox1"
            name="checkbox1"
          />
        </label>
        <p className="flex items-center">|</p>
        <br />
      </form>
    </div>
  );
};

export default PlaylistParameters;
