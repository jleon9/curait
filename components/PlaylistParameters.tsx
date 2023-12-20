const PlaylistParameters = () => {
  return (
    <div data-aos="fade-up" data-aos-delay="400">
      <form>
        <label className="p-3" htmlFor="userInput">
          Mood
        </label>
        <br />
        <select className="m-3 text-black" id="fruits" name="fruits">
          <option value="chill">chill</option>
          <option value="dance">dance</option>
          <option value="hardcore">hardcore</option>
        </select>
        <br />
        <label className="p-3" htmlFor="userInput">
          Genre
        </label>
        <br />
        <select className="m-3 text-black" id="fruits" name="fruits">
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
        <select className="m-3 text-black" id="fruits" name="fruits">
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
