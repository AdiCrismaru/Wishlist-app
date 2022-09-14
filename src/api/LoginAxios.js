import axios from "./axios";

const token = localStorage.getItem("token");

export const postLogin = async (payload) => {
  return await axios("/login", payload, {
    Headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
