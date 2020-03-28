import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../Login/react-auth0-spa.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFolder,
  faSearch,
  faEnvelope,
  faUser,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../Logo";
import "./Header.scss";
import PropTypes from "prop-types";

function useOutsideAlerter(ref, close) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      close();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.close);
  return <div ref={wrapperRef}>{props.children}</div>;
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired
};

function Header() {
  const { isAuthenticated } = useAuth0();
  const [isShow, setShow] = useState(false);
  const [mobWidth, setWidth] = useState(window.innerWidth < 1024);

  const handleResize = () => {
    setWidth(window.innerWidth < 1024);
  };

  useEffect(() => {
    window.addEventListener("orientationchange", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  });

  const PATH = "";
  return (
    <div className="header">
      <Link to={`/${PATH}`}>
        <Logo />
      </Link>
      <OutsideAlerter
        close={() => {
          isShow && mobWidth && setShow(!isShow);
        }}
      >
        <nav
          className="nav"
          onClick={() => {
            isShow && setShow(!isShow);
          }}
        >
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            onClick={() => {
              mobWidth && setShow(!isShow);
            }}
          />
          <ul className={!isShow && mobWidth ? "hidden" : "ul"}>
            <Login />
            <Link to={PATH}>
              <FontAwesomeIcon icon={faHome} size="lg" />
              home
            </Link>
            <Link to={PATH + "/projects"}>
              <FontAwesomeIcon icon={faFolder} size="lg" />
              projects
            </Link>
            <Link to={PATH + "/contact"}>
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
              contact
            </Link>
            <Link to={PATH + "/how-to"}>
              <FontAwesomeIcon icon={faSearch} size="lg" />
              how-to
            </Link>
            {isAuthenticated && (
              <Link to={PATH + "/profile"}>
                <FontAwesomeIcon icon={faUser} size="lg" />
                profile
              </Link>
            )}
          </ul>
        </nav>
      </OutsideAlerter>
    </div>
  );
}

function Login() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const props = !isAuthenticated
    ? {
        class: "button login",
        onClick: () => loginWithRedirect({}),
        text: "Log in"
      }
    : { class: "button logout", onClick: () => logout(), text: "Log out" };
  return (
    <button className={props.class} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Header;
