import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import User from "./User";
import { getUsers } from "../../api/UsersAxios";

function UsersUI() {
  const [data, setData] = useState([]);

  const setUsersList = () => {
    getUsers()
      .then((res) => {
        setData(res.data.users);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setUsersList();
  }, []);

  const mapUsers = data.map((object) => {
    return <User object={object} />;
  });
  return (
    <>
      <Nav />
      {mapUsers}
    </>
  );
}

export default UsersUI;
