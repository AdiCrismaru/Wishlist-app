import React, { useState, useEffect } from "react";
import { getUsers } from "../../api/UsersAxios";

function UpdateGroupForm({
  id,
  group,
  onSubmitHandler,
  postGroupUsersHandler,
}) {
  const [data, setData] = useState({
    name: group.name,
    details: group.details,
  });

  const [usersData, setUsersData] = useState({ userIds: [] });
  const [usersRequest, setUsersRequest] = useState([]);

  useEffect(() => {
    getUsers().then((res) => {
      console.log(res);
      setUsersRequest(res.data.users);
    });
  }, []);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSelectHandler = (e) => {
    const value = parseInt(e.target.value);
    let arrCopy = usersData.users;
    if (arrCopy.includes(value)) {
      arrCopy.splice(arrCopy.indexOf(value), 1);
    } else {
      arrCopy.push(value);
    }
    setUsersData({ ...usersData, users: arrCopy });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler(id, data);
        postGroupUsersHandler(id, usersData);
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
        {usersRequest.map((user) => {
          return (
            <div key={user.id}>
              <label>
                <input
                  type="checkbox"
                  value={user.id}
                  checked={usersData.userIds.includes(user.id)}
                  onClick={onSelectHandler}
                />
                {user.name}
              </label>
            </div>
          );
        })}
        <input type="submit" value="Update"></input>
      </div>
    </form>
  );
}

export default UpdateGroupForm;
