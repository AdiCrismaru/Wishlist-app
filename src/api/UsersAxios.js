import axios from "./axios";

export const getUsers = async (start) => {
  return await axios.get(`/users?start=${start ? start : 0}&limit=9`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const searchUsers = async (value) => {
  return await axios.get(`/users/?search=${value}`, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
