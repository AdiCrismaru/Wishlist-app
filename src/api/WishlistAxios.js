import axios from "./axios";

const token = localStorage.getItem("token");

export const getWishlists = async (start) => {
  return await axios.get(`/wishlists?start=${start ? start : 0}&limit=6`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const postWishlist = async (payload) => {
  return await axios.post("/wishlists", payload, {
    headers: { authorization: `Bearer ${token}` },
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
    headers: { authorization: `Bearer ${token}` },
  });
};

export const deleteWishlist = (id) => {
  return axios.delete(`/wishlists/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};
