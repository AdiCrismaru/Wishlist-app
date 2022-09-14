import React, { useState } from "react";

function UpdateGroupForm({ id, group, onSubmitHandler }) {
  const [data, setData] = useState({
    name: group.name,
    details: group.details,
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
          type="text"
          value={data.name}
          onChange={onChangeHandler}
          placeholder="Name"
        ></input>
        <input
          name="details"
          type="text"
          value={data.details}
          onChange={onChangeHandler}
          placeholder="Details"
        ></input>
        <input type="submit" value="Update"></input>
      </div>
    </form>
  );
}

export default UpdateGroupForm;
