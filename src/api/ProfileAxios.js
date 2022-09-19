import axios from "./axios";

export const getProfileInfo = async () => {
  return await axios.get("/me", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const putProfileInfo = (payload) => {
  return axios.put("/me", payload, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
