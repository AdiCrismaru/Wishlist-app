import axios from "./axios";

export const postLogin = async (payload) => {
  return await axios("/login", payload, {
    Headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
