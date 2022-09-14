import axios from "./axios";

const token = localStorage.getItem("token");

export const getGroups = async () => {
  return await axios.get("/groups", {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getSharedGroups = async () => {
  return await axios.get("/groups/shared", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const postGroup = async (payload) => {
  return await axios.post("/groups", payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const updateGroup = (id, payload) => {
  return axios.put(`/groups/${id}`, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteGroup = (id) => {
  return axios.delete(`/groups/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};