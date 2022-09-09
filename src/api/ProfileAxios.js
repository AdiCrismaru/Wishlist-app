import axios from "./axios";

export const getProfileInfo = axios.get("/me", {
  headers: {
    authorization: `Bearer ${token}`,
  },
});
