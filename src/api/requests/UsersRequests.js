import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import axios from "../axios";
import User from "../../components/User";
import Nav from "../../components/Nav";
import { isNotEmptyArray } from "./FunctionUtility";

function UsersRequests() {
  const token = localStorage.getItem("token");

  const { users, setUsers } = useContext(UsersContext);

  const getUsers = async () => {
    const response = await axios.get("/users", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setUsers(response.data.users);
    console.log(users);
  };

  useEffect(() => {
    getUsers().catch((err) => {
      console.log(err);
    });
  }, []);

  const mapUsers = users.map((object) => {
    return <User object={object} />;
  });

  return (
    <>
      <Nav />
      {mapUsers}
    </>
  );
}

export default UsersRequests;
