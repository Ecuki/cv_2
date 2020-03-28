import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

function Button({ className, text, to, id }) {
  return (
    <Link to={to} id={id} className={`button ${className}`}>
      {text}
    </Link>
  );
}

export default Button;
