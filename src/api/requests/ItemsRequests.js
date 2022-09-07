import React, { useState, useEffect, useContext } from "react";
import ItemsUI from "../../pages/itemsPage/ItemsUI";
import { ItemsContext } from "../../context/ItemsContext";
import Item from "../../components/Item";
import axios from "../axios";

export default function ItemsRequests() {
  const token = localStorage.getItem("token");

  const {
    name,
    details,
    size,
    maker,
    model,
    link,
    setId,
    data,
    setData,
    modal,
    setModal,
    modalPut,
    setModalPut,
  } = useContext(ItemsContext);

  const getData = async () => {
    const response = await axios.get("/items", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.items);
  };

  useEffect(() => {
    getData().catch((err) => {
      console.log(err);
    });
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/items",
        {
          name,
          details,
          size,
          maker,
          model,
          link,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      getData();
    } catch (err) {
      console.log(err);
    }
    toggleModal();
  };

  const handleUpdateItem = (id) => {
    axios
      .put(
        `/items/${id}`,
        { name, details, size, maker, model, link },
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

    toggleModalPut();
  };

  const handleDeleteItem = (id) => {
    axios
      .delete(`/items/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModalPut = (id) => {
    setModalPut(!modalPut);
    setId(id);
  };

  const mapData = data.map((object) => {
    return (
      <Item
        object={object}
        handleDeleteItem={handleDeleteItem}
        toggleModalPut={toggleModalPut}
      />
    );
  });

  return (
    <ItemsUI
      handleAddItem={handleAddItem}
      toggleModal={toggleModal}
      mapData={mapData}
      handleUpdateItem={handleUpdateItem}
      toggleModalPut={toggleModalPut}
    />
  );
}
