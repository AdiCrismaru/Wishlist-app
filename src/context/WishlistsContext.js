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

  const [nameUpdate, setNameUpdate] = useState("");
  const [detailsUpdate, setDetailsUpdate] = useState("");
  const [itemIdsUpdate, setItemIdsUpdate] = useState([]);
  const [itemIdHolder, setItemIdHolder] = useState([]);

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
    setData(response.data.wishlists.reverse());
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
        {
          wishlist: { name: nameUpdate, details: detailsUpdate },
          itemIds: itemIdsUpdate,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.status === 200) {
          getWishlists();
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // toggleModalUpdateItem();
    setModalUpdateItem(false);
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

  const arr = [];

  const toggleModalUpdateItem = (id) => {
    setModalUpdateItem(!modalUpdateItem);
    setId(id);
    getItems();
    const listValues = data.find((list) => {
      return list.id === id;
    });
    if (!modalUpdateItem) {
      setNameUpdate(listValues.name);
      setDetailsUpdate(listValues.details);
      setItemIdHolder(listValues.items);

      itemIdHolder.map((item) => {
        arr.push(item.id);
      });

      setItemIdsUpdate(arr);
      console.log(itemIdsUpdate);
      console.log(arr);
    }
  };

  return (
    <WishlistsContext.Provider
      value={{
        data,
        setData,
        name,
        setName,
        nameUpdate,
        setNameUpdate,
        details,
        setDetails,
        detailsUpdate,
        setDetailsUpdate,
        itemIds,
        setItemIds,
        itemIdsUpdate,
        setItemIdsUpdate,
        itemIdHolder,
        setItemIdHolder,
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
