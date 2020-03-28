import React, { useState } from "react";
import { useAsync } from "react-async-hook";
import logoSmall from "../../assets/img/PoweredBy_200_Horizontal_Light-Backgrounds_With_Logo.gif";
import logoBig from "../../assets/img/PoweredBy_640_Horizontal_Light-Backgrounds_With_Logo.gif";
import "./Giphy.scss";
const fetchGiphy = async query =>
  query !== "" &&
  (
    await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY}&q=${query}&limit=25&offset=0&rating=G&lang=en`
    )
  ).json();

const Giphy = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const asyncGiphy = useAsync(fetchGiphy, [query]);

  return (
    <div className={"gifs"}>
      <h1 className={"gifs__title"}>
        Or just search for GIFs
        <span role="img" aria-label="smile">
          😎
        </span>
      </h1>
      <form
        className={"gifs__form"}
        onSubmit={e => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="search for Gifs"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <>
        {asyncGiphy.loading && <div className={"gifs__loading"}>Loading</div>}
        {asyncGiphy.error && (
          <div className={"gifs__error"}>Error: {asyncGiphy.error.message}</div>
        )}
        {asyncGiphy.result && (
          <div className={"gifs__conteiner"}>
            {asyncGiphy.result.data.map(obj => (
              <div
                key={obj.images.preview_webp.url}
                className="gif_bgi"
                style={{
                  backgroundImage: `url(${obj.images.preview_webp.url})`
                }}
              >
                {" "}
                <video
                  autoPlay
                  loop
                  title={obj.title}
                  src={obj.images.preview.mp4}
                />
              </div>
            ))}
          </div>
        )}

        <img
          className={"gifs__logo"}
          src={window.innerWidth > 600 ? logoBig : logoSmall}
          alt="Giphy logo"
        />
      </>
    </div>
  );
};
export default Giphy;
