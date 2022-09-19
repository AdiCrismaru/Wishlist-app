import axios from "./axios";

export const getGroups = async (start) => {
  return await axios.get(`/groups?start=${start ? start : 0}&limit=3`, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const postGroup = async (payload) => {
  return await axios.post("/groups", payload, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const addGroupUsers = async (id, payload) => {
  // console.log(payload, id);
  const payloadObj = { userIds: payload.users };
  // console.log(payloadObj);
  return await axios.post(`/groups/${id}/users`, payloadObj, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const addGroupWishlist = async (id, payload) => {
  const payloadObj = { wishlistIds: payload.wishlists };
  return await axios.post(`/groups/${id}/wishlists`, payloadObj, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const updateGroup = (id, payload) => {
  return axios.put(`/groups/${id}`, payload, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// export const groupInvite = (id, payload) => {
//   return axios.put(`/groups/${id}/invite`, payload, {
//     headers: { authorization: `Bearer ${token}` },
//   });
// };

export const deleteGroup = (id) => {
  return axios.delete(`/groups/${id}`, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
