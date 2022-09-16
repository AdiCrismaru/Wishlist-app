import axios from "./axios";

export const getNotifications = async () => {
  return await axios.get("/me/notifications", {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
