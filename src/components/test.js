import axios from "../api/axios";

const token = localStorage.getItem("token");

export const GetTest = () => {
  return axios.get("/items", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
