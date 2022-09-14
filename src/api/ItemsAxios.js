import axios from "./axios";
const token = localStorage.getItem("token");

export const getItems = async () => {
  return await axios.get("/items", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const postItems = async (payload) => {
  return await axios.post("/items", payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const updateItems = (id, payload) => {
  return axios.put(`/items/${id}`, payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const deleteItems = (id) => {
  return axios.delete(`/items/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
