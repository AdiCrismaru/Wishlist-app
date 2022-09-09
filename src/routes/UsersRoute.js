import React from "react";
import { UsersProvider } from "../context/UsersContext";
import UsersUI from "../pages/usersPage/UsersUI";

function UsersRoute() {
  return (
    <UsersProvider>
      <UsersUI />
    </UsersProvider>
  );
}

export default UsersRoute;
