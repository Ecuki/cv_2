import React, { useState, useEffect } from "react";
import "./TV.scss";

function TV({ name, git, preview, imgs, assets }) {
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
        <img src={assets.eyeIcon} alt="See demo" />
      </a>
      <a href={git} target="_blank" rel="noopener noreferrer" title="GitHub">
        <img src={assets.gitIcon} alt="GitHub" />
      </a>
      {!assets.eyeIcon ? (
        <div className={"gifs__loading"}>Loading</div>
      ) : (
        <div className="TV">
          <div
            className="TV__frame"
            style={{ backgroundImage: `url(${assets.tvFrame})` }}
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
