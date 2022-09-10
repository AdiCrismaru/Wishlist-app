const token = localStorage.getItem("token");

export const GetItems = async () => {
  await axios.get("/items", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
