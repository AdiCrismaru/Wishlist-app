import axios from "./axios";

export const getWishlists = async (start) => {
  return await axios.get(`/wishlists?start=${start ? start : 0}&limit=6`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const postWishlist = async (payload) => {
  return await axios.post("/wishlists", payload, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const updateWishlists = (id, payload) => {
  const obj = {
    wishlist: {
      name: payload.name,
      details: payload.details,
    },
    itemIds: payload.itemIds,
  };
  return axios.put(`/wishlists/${id}`, obj, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const deleteWishlist = (id) => {
  return axios.delete(`/wishlists/${id}`, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const buyItem = (id, itemId, data) => {
  const payload = { buyersIds: data };
  return axios.put(`/wishlists/${id}/items/${itemId}/buy`, payload, {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
