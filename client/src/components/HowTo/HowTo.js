import React, { useReducer, useContext } from "react";
import { useAuth0 } from "../../Login/react-auth0-spa";
import Modal from "./Modal";
import Search from "./Search";
import axios from "axios";
import "./HowTo.scss";
import { useEffect } from "react";

const proxy = "/api/howtos";

export const Context = React.createContext();

function appReducer(state, action) {
  switch (action.type) {
    case "load":
      return {
        ...state,
        active: action.payload[0] ? action.payload[0]._id : 0,
        items: action.payload.map(item => {
          item = {
            id: item._id,
            description: item.description,
            url: item.url,
            text: item.text
          };
          return item;
        })
      };
    case "active":
      return {
        ...state,
        active: action.payload
      };
    case "new":
      return { ...state, modal: true };
    case "post": {
      let { description, url, text } = action.payload;
      axios
        .post(proxy, { description, url, text })
        .then(res => {
          console.log(res);
          window.location.reload();
        })
        .catch(error => console.log(error));
      return { ...state };
    }
    case "delete":
      axios
        .delete(proxy + "/" + action.payload)
        .then(res => {
          window.location.reload();
        })
        .catch(error => console.log(error));
      return { ...state };
    case "edit":
      return {
        ...state,
        modal: true,
        isEdited: true,
        active: action.payload
      };
    case "exit":
      return {
        ...state,
        modal: false,
        isEdited: false
      };
    case "update": {
      const { description, url, text } = action.payload;
      axios
        .put(proxy + "/" + action.payload.id, {
          description,
          url,
          text
        })
        .then(res => {
          window.location.reload();
        })
        .catch(error => console.log(error));
      return { ...state };
    }
    case "search":
      return {
        ...state,
        search: action.payload
      };
    default:
      return state;
  }
}

function HowTo() {
  const [state, dispatch] = useReducer(appReducer, {
    active: 0,
    items: [],
    search: [""],
    modal: false,
    isEdited: false
  });
  const { isAuthenticated } = useAuth0();
  const { items, search, active, modal, isEdited } = state;
  const getActiveItem = () => items.filter(item => item.id === active)[0];
  const getEditItem = () => (isEdited ? getActiveItem() : {});

  useEffect(() => {
    console.log(proxy);
    axios
      .get(proxy)
      .then(res => dispatch({ type: "load", payload: res.data }))
      .catch(error => console.log(error));
  }, []);

  const searchItems = () => {
    let words = [];
    if (search.length === 1 && search[0] === "") {
      words = items;
    } else {
      items.map(item =>
        search.map(s => {
          const isInclude = item.description
            .toLowerCase()
            .includes(s.toLowerCase())
            ? true
            : false;
          const isUnique = words.indexOf(item) === -1 ? true : false;
          return isInclude && isUnique && s !== "" ? words.push(item) : null;
        })
      );
    }

    return words;
  };

  return (
    <Context.Provider
      value={{
        dispatch,
        isAuthenticated,
        active
      }}
    >
      <div className="howTo">
        <Search />
        <HowToList items={searchItems()} />
        <HowToDescription {...getActiveItem()} />
      </div>
      {modal && <Modal isEdited={isEdited} {...getEditItem()} />}
    </Context.Provider>
  );
}

export default HowTo;

function HowToList({ items }) {
  return (
    <ul className="howTo__list">
      {items.map(item => (
        <HowToItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

function HowToItem({ id, description }) {
  const { dispatch } = useContext(Context);
  const { active } = useContext(Context);
  return (
    <li
      id={id}
      key={id}
      onClick={() => dispatch({ type: "active", payload: id })}
      className={id === active ? "active" : ""}
    >
      {description}
    </li>
  );
}
function HowToDescription({ id, text, url }) {
  const { dispatch, isAuthenticated, active } = useContext(Context);
  return (
    <>
      <div className="howTo__description-top">
        <button
          onClick={() => {
            dispatch({ type: "edit", payload: id });
          }}
          className={"button"}
          disabled={!active || !isAuthenticated}
        >
          Edit
        </button>
      </div>
      <p className="howTo__description-mid"> {text}</p>
      <div className="howTo__description-bottom">
        <a
          className="howTo__link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
        <button
          className="button new"
          onClick={e => {
            e.preventDefault();
            dispatch({ type: "new" });
          }}
          title="Add new"
          disabled={!isAuthenticated}
        >
          New
        </button>
      </div>
    </>
  );
}
