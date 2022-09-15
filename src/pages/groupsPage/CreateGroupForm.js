import React, { useState } from "react";

export default function CreateGroupForm({ postGroupHandler }) {
  const [data, setData] = useState({});

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        postGroupHandler(data);
      }}
    >
      <div className="user-input">
        <input
          name="name"
          onChange={onChangeHandler}
          type="text"
          placeholder="Group name"
          autoComplete="off"
        ></input>
        <input
          name="details"
          onChange={onChangeHandler}
          type="text"
          placeholder="Details"
          autoComplete="off"
        ></input>

        <input type="submit" value="Create" />
      </div>
    </form>
  );
}
