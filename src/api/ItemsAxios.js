import axios from "./axios";

export const getItems = async (start) => {
  return await axios.get(`/items?start=${start ? start : 0}&limit=6`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const postItems = async (payload) => {
  return await axios.post("/items", payload, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const updateItems = (id, payload) => {
  return axios.put(`/items/${id}`, payload, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const deleteItems = (id) => {
  return axios.delete(`/items/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
