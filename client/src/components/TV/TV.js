import React, { useState, useEffect, useReducer } from "react";
import { useAsync } from "react-async-hook";
import "./TV.scss";

const initialState = {
  active: false,
  index: 0,
  image: ""
};

function appReducer(state, action) {
  switch (action.type) {
    case "switchTV":
      return {
        ...state,
        index: 0,
        active: !state.active
      };
    case "incrementIndex":
      return {
        ...state,
        index: action.payload
      };
    case "setImage":
      return {
        ...state,
        image: action.payload
      };
    default:
      return state;
  }
}

function TV({ name, git, preview, imgs, assets }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { active, index, image } = state;

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        dispatch({
          type: "incrementIndex",
          payload: index < imgs.length - 1 ? index + 1 : 0
        });
      }, 3500);
      dispatch({ type: "setImage", payload: imgs[index].src });
      return () => clearInterval(interval);
    }
  }, [active, imgs.length, index]);

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
            style={active ? { backgroundImage: `url(${image})` } : {}}
          ></div>
          <div
            className={active ? `TV__switch TV__switch-active` : "TV__switch"}
            onClick={() => dispatch({ type: "switchTV" })}
            title="Turn ON/OFF"
          ></div>
        </div>
      )}
    </>
  );
}

export default TV;
