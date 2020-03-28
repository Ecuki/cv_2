import React, { useState, useEffect } from "react";
import { useAsync } from "react-async-hook";
import eyeIcon from "../../assets/img/eye.svg";
import gitIcon from "../../assets/img/github_icon.svg";
import tvFrame from "../../assets/img/tv-cut2.png";
import "./TV.scss";

const fetchImage = async url => await fetch(url);

function TV({ name, git, preview, imgs }) {
  const asyncImage = useAsync(fetchImage, [tvFrame]);
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState("");
  const handleSwitchTV = () => {
    setActive(!active);
    setIndex(0);
  };

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setIndex(index < imgs.length - 1 ? index + 1 : 0);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [active, imgs.length, index]);

  const styles = active
    ? {
        backgroundImage: "url(" + imgs[index].src + ")"
      }
    : {};

  return (
    <>
      <h2 className="project__title">{name}</h2>
      <a
        href={preview}
        target="_blank"
        rel="noopener noreferrer"
        title="See demo"
      >
        <img src={eyeIcon} alt="See demo" />
      </a>
      <a href={git} target="_blank" rel="noopener noreferrer" title="GitHub">
        <img src={gitIcon} alt="GitHub" />
      </a>

      {asyncImage.loading && <div className={"gifs__loading"}>Loading</div>}
      {asyncImage.error && (
        <div className={"gifs__error"}>Error: {asyncImage.error.message}</div>
      )}
      {asyncImage.result && (
        <div className="TV">
          <div
            className="TV__frame"
            style={{ backgroundImage: `url(${asyncImage.result.url})` }}
          ></div>
          <div
            className={active ? `TV__screen TV__screen-on` : "TV__screen"}
            style={styles}
          ></div>
          <div
            className={active ? `TV__switch TV__switch-active` : "TV__switch"}
            onClick={handleSwitchTV}
            title="Turn ON/OFF"
          ></div>
        </div>
      )}
    </>
  );
}

export default TV;
