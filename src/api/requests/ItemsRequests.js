import React, { useState, useEffect, useContext } from "react";
import ItemsUI from "../../pages/itemsPage/ItemsUI";
import axios from "../axios";
import { ItemsContext } from "../../context/ItemsContext";

export default function ItemsRequests() {
  const token = localStorage.getItem("token");

  const { name, details, size, maker, model, link, setId, data, setData } =
    useContext(ItemsContext);

  const [modal, setModal] = useState(false);
  const [modalPut, setModalPut] = useState(false);

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
      const response = await axios.post(
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

  const handleChangeItem = (id) => {
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

  const mapData = data.map(
    ({ id, name, details, size, maker, model, link }) => {
      return (
        <div key={id} className="items">
          <span>
            <p>ID: {id}</p>
            <p>Name: {name}</p>
            <p>Details: {details}</p>
            <p>Size: {size}</p>
            <p>Maker: {maker}</p>
            <p>Model: {model}</p>
            <p>Link: {link}</p>
          </span>
          <button
            onClick={() => {
              handleDeleteItem(id);
            }}
          >
            D
          </button>
          <button
            onClick={() => {
              toggleModalPut(id);
            }}
          >
            C
          </button>
        </div>
      );
    }
  );

  return (
    <ItemsUI
      handleAddItem={handleAddItem}
      toggleModal={toggleModal}
      modal={modal}
      mapData={mapData}
      handleChangeItem={handleChangeItem}
      toggleModalPut={toggleModalPut}
      modalPut={modalPut}
    />
  );
}
