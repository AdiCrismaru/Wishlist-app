import { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

export const UsersContext = createContext({});
export const UsersUpdateContext = createContext();

export function useUsers() {
  return useContext(UsersContext);
}
export function useUsersUpdate() {
  return useContext(UsersUpdateContext);
}

const token = localStorage.getItem("token");

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

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

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      <UsersUpdateContext.Provider value={getUsers}>
        {children}
      </UsersUpdateContext.Provider>
    </UsersContext.Provider>
  );
}
