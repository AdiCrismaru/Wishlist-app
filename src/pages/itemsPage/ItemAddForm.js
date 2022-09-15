import React, { useState } from "react";
import "../../components/Modal.css";

export default function ItemAddForm({ postItemHandler }) {
  const [data, setData] = useState({});

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        postItemHandler(data);
      }}
    >
      <div className="user-input">
        <input
          name="name"
          onChange={onChangeHandler}
          type="text"
          placeholder="Item name"
          autoComplete="off"
        ></input>
        <input
          name="details"
          onChange={onChangeHandler}
          type="text"
          placeholder="Details"
        ></input>
        <input
          name="size"
          onChange={onChangeHandler}
          type="text"
          placeholder="Size"
        ></input>
        <input
          name="maker"
          onChange={onChangeHandler}
          type="text"
          placeholder="Maker"
        ></input>
        <input
          name="model"
          onChange={onChangeHandler}
          type="text"
          placeholder="Model"
        ></input>
        <input
          name="link"
          onChange={onChangeHandler}
          type="text"
          placeholder="Link"
        ></input>
        <button type="submit" className="btn btn-secondary">
          Add new item
        </button>
      </div>
    </form>
  );
}
