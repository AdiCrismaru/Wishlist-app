import React, { useState } from "react";

export default function UpdateItemForm({ id, item, onSubmitHandler }) {
  const [data, setData] = useState({
    name: item.name,
    details: item.details,
    size: item.size,
    maker: item.maker,
    model: item.model,
    link: item.link,
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler(id, data);
      }}
    >
      <div className="user-input">
        <input
          name="name"
          value={data.name}
          onChange={onChangeHandler}
          type="text"
          placeholder="Item name"
          autoComplete="off"
        ></input>
        <input
          name="details"
          value={data.details}
          onChange={onChangeHandler}
          type="text"
          placeholder="Details"
        ></input>
        <input
          name="size"
          value={data.size}
          onChange={onChangeHandler}
          type="text"
          placeholder="Size"
        ></input>
        <input
          name="maker"
          value={data.maker}
          onChange={onChangeHandler}
          type="text"
          placeholder="Maker"
        ></input>
        <input
          name="model"
          value={data.model}
          onChange={onChangeHandler}
          type="text"
          placeholder="Model"
        ></input>
        <input
          name="link"
          value={data.link}
          onChange={onChangeHandler}
          type="text"
          placeholder="Link"
        ></input>
        <button type="submit" className="btn btn-secondary">
          Update
        </button>
      </div>
    </form>
  );
}
