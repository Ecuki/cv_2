import React, { useContext } from "react";
import { Context } from "./HowTo";

export default function Search() {
  const { dispatch } = useContext(Context);
  const handleChange = e => {
    e.preventDefault();
    let search = e.currentTarget.value.split(" ");

    dispatch({ type: "search", payload: search });
  };

  return (
    <form>
      <label htmlFor="search">How to:</label>
      <input
        type="text"
        id="search"
        name="q"
        aria-label="Search for HowTO"
        onChange={e => handleChange(e)}
        placeholder="search"
      />
    </form>
  );
}
