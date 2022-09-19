import axios from "./axios";

export const getSharedGroups = async (start) => {
  return await axios.get(`/groups/shared?start=${start ? start : 0}&limit=9`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
