import React from "react";
import Nav from "../../components/Nav";
import { useUsers } from "../../context/UsersContext";
import User from "../../components/User";

function UsersUI() {
  const { users } = useUsers();
  const mapUsers = users.map((object) => {
    return <User object={object} />;
  });
  return (
    <div>
      <Nav />
      {mapUsers}
    </div>
  );
}

export default UsersUI;
