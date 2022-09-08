import React, { useState, useEffect, useContext } from "react";
import { WishlistsContext } from "../../context/WishlistsContext";
import WishlistUI from "../../pages/wishlistsPage/WishlistUI";
import List from "../../components/List";
import axios from "../axios";

export default function WishlistsRequests() {
  const token = localStorage.getItem("token");

  const {
    data,
    setData,
    name,
    details,
    itemIds,
    setId,
    modalAddItem,
    setModalAddItem,
    modalUpdateItem,
    setModalUpdateItem,
    setItemData,
  } = useContext(WishlistsContext);

  const getData = async () => {
    const response = await axios.get("/wishlists", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.wishlists);
  };

  useEffect(() => {
    getData().catch((err) => {
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
        getData();
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
          getData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    toggleModalUpdateItem();
  };

  const onChangeHandler = (e) => {
    console.log(e.target.value);
  };

  const toggleModalUpdateItem = (id) => {
    setModalUpdateItem(!modalUpdateItem);
    setId(id);
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
  const toggleModalAddItem = () => {
    setModalAddItem(!modalAddItem);
    getItems();
  };

  const DELETEhandler = (id) => {
    axios
      .delete(`/wishlists/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const wishlistsMap = data.map((object) => {
    return (
      <List
        object={object}
        DELETEhandler={DELETEhandler}
        toggleModalUpdateItem={toggleModalUpdateItem}
      />
    );
  });
  return (
    <WishlistUI
      toggleModalAddItem={toggleModalAddItem}
      POSThandler={POSThandler}
      wishlistsMap={wishlistsMap}
      toggleModalUpdateItem={toggleModalUpdateItem}
      PUThandler={PUThandler}
    />
  );
}
