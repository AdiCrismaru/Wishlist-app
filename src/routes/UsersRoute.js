import React, { useState } from "react";
import { UsersContext } from "../context/UsersContext";
import UsersRequests from "../api/requests/UsersRequests";

function UsersRoute() {
  const [users, setUsers] = useState([]);
  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      <UsersRequests />;
    </UsersContext.Provider>
  );
}

export default UsersRoute;
