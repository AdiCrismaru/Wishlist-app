import { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

export const WishlistsContext = createContext({});
export const WishlistsUpdateContext = createContext();

export function useWishlists() {
  return useContext(WishlistsContext);
}
export function useWishlistsUpdate() {
  return useContext(WishlistsUpdateContext);
}

export function WishlistsProvider({ children }) {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const [itemIds, setItemIds] = useState([]);
  const [id, setId] = useState([]);

  const [modalUpdateItem, setModalUpdateItem] = useState(false);
  const [modalAddItem, setModalAddItem] = useState(false);

  const [itemData, setItemData] = useState([]);

  const token = localStorage.getItem("token");

  const getWishlists = async () => {
    const response = await axios.get("/wishlists", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.wishlists);
  };

  useEffect(() => {
    getWishlists().catch((err) => {
      console.log(err);
    });
  }, []);

  const POSThandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "/wishlists",
        {
          wishlist: {
            name,
            details,
          },
          itemIds,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        setName("");
        setDetails("");
        setItemIds([]);
        getWishlists();
        toggleModalAddItem();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PUThandler = (id) => {
    axios
      .put(
        `/wishlists/${id}`,
        { wishlist: { name, details }, itemIds },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.status === 200) {
          getWishlists();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    toggleModalUpdateItem();
  };

  const getItems = async () => {
    await axios
      .get("/items", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setItemData(response.data.items);
        console.log(itemData);
      });
  };

  const DELETEhandler = (id) => {
    axios
      .delete(`/wishlists/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getWishlists();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModalAddItem = () => {
    setModalAddItem(!modalAddItem);
    getItems();
  };

  const toggleModalUpdateItem = (id) => {
    setModalUpdateItem(!modalUpdateItem);
    setId(id);
    getItems();
  };

  return (
    <WishlistsContext.Provider
      value={{
        data,
        setData,
        name,
        setName,
        details,
        setDetails,
        itemIds,
        setItemIds,
        id,
        setId,
        modalAddItem,
        setModalAddItem,
        modalUpdateItem,
        setModalUpdateItem,
        itemData,
        setItemData,
      }}
    >
      <WishlistsUpdateContext.Provider
        value={{
          POSThandler,
          PUThandler,
          DELETEhandler,
          toggleModalAddItem,
          toggleModalUpdateItem,
        }}
      >
        {children}
      </WishlistsUpdateContext.Provider>
    </WishlistsContext.Provider>
  );
}
