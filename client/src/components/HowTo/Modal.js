import React, { useContext } from "react";
import { Context } from "./HowTo";
import "./Modal.scss";

export default function Modal({
  id = Date.now(),
  description = "",
  url = "",
  text = "",
  isEdited
}) {
  const { dispatch } = useContext(Context);

  const handleSave = e => {
    e.preventDefault();
    const values = {};
    [...e.currentTarget].map(item => {
      if (item.name !== "") {
        return (values[item.name] = item.value);
      } else {
        return (values[item.name] = item.value);
      }
    });

    const type = isEdited ? "update" : "post";
    dispatch({ type: type, payload: values });
  };

  const handleReset = e => {
    e.preventDefault();
    const values = [...e.currentTarget];
    const id = values.findIndex(item => item.name === "id");
    dispatch({ type: "delete", payload: values[id].value });
  };

  return (
    <div className="modal">
      <span className="exit" onClick={() => dispatch({ type: "exit" })}>
        +
      </span>
      <form
        onSubmit={e => handleSave(e)}
        onReset={e => handleReset(e)}
        key={id}
      >
        <label htmlFor="id">Id:</label>
        <input type="text" name="id" defaultValue={id} disabled />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          defaultValue={description}
          required
        />
        <br />
        <label htmlFor="url">Url:</label>
        <input type="text" name="url" defaultValue={url} required />
        <br />
        <label htmlFor="text">Text:</label>
        <textarea
          type="text"
          name="text"
          defaultValue={text}
          disabled={false}
          required
        />
        <br />
        <input type="submit" value="Save" className="button save" />
        <input
          type="reset"
          value="Delete"
          className="button delete"
          disabled={!isEdited}
        />
      </form>
    </div>
  );
}
