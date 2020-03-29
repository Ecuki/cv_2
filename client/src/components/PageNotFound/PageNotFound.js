import React from "react";
import Button from "../Button";
import "./PageNotFound.scss";
import background from "../../assets/img/universe-2742113_1280.jpg";

function PageNotFound() {
  return (
    <div
      className="pageNotFound"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="pageNotFound__content">
        <h1 className="pageNotFound__title">404</h1>
        <p className="pageNotFound__message">
          You are far... far away from home
        </p>
        <Button
          to="/"
          className="pageNotFound__button"
          text="Back Home"
        ></Button>
      </div>
    </div>
  );
}

export default PageNotFound;
