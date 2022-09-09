import { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

export const GroupsContext = createContext();
export const GroupsUpdateContext = createContext();

export function useGroups() {
  return useContext(GroupsContext);
}
export function useGroupsUpdate() {
  return useContext(GroupsUpdateContext);
}
export function GroupsProvider({ children }) {
  const token = localStorage.getItem("token");

  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const getGroups = async () => {
    const response = await axios.get("/groups", {
      headers: { authorization: `Bearer ${token}` },
    });
    setGroups(response.data.groups);
    console.log(groups);
  };
  useEffect(() => {
    getGroups().catch((err) => {
      console.log(err);
    });
  }, []);

  const PostGroups = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "/wishlists",
        {
          name,
          details,
        },

        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        getGroups();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <GroupsContext.Provider
      value={{ groups, setGroups, name, setName, details, setDetails }}
    >
      <GroupsUpdateContext.Provider value={{ PostGroups }}>
        {children}
      </GroupsUpdateContext.Provider>
    </GroupsContext.Provider>
  );
}
