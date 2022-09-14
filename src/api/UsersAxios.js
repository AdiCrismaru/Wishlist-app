import axios from "./axios";

const token = localStorage.getItem("token");

export const getUsers = async () => {
  return await axios.get("/users", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
