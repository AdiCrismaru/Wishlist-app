import axios from "./axios";

export const getUsers = async (start, search) => {
  return await axios.get(
    `/users?start=${start ? start : 0}&limit=9&search=${search ? search : ""}`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
