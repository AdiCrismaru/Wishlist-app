import React, { useState } from "react";

function UpdateProfileModal({ user, onSubmitHandler }) {
  const [data, setData] = useState({
    name: user.name,
    phone: user.phone,
    dob: user.dob,
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler(data);
      }}
    >
      <input
        name="name"
        value={data.name}
        onChange={onChangeHandler}
        type="text"
        placeholder="Name"
        autoComplete="off"
      ></input>
      <input
        name="phone"
        value={data.phone}
        onChange={onChangeHandler}
        type="tel"
        placeholder="Phone"
        autoComplete="off"
      ></input>
      <input
        name="dob"
        value={data.dob}
        onChange={onChangeHandler}
        type="date"
      ></input>
      <input type="submit" value="Update" />
    </form>
  );
}

export default UpdateProfileModal;
