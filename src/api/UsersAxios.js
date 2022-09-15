import axios from "./axios";

const token = localStorage.getItem("token");

export const getUsers = async (start) => {
  return await axios.get(`/users?start=${start ? start : 0}&limit=9`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const getUsersNoParams = async () => {
  return await axios.get("/users", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
