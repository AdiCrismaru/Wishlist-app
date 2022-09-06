import React, { useState, useEffect } from "react";
import WishlistUI from "../../../components/WishlistUI";
import axios from "../../axios";

export default function Items() {
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [size, setSize] = useState("");
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [link, setLink] = useState("");

  const [modalId, setModalId] = useState("");

  const [data, setData] = useState([]);

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
    setModalId(id);
  };

  const mapData = data.map(
    ({ id, name, details, size, maker, model, link }) => {
      return (
        <div key={id} className="items">
          <span>
            <p>{name}</p>
            <p>{details}</p>
            <p>{size}</p>
            <p>{maker}</p>
            <p>{model}</p>
            <p>{link}</p>
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
    <WishlistUI
      name={name}
      details={details}
      size={size}
      maker={maker}
      model={model}
      link={link}
      data={data}
      handleAddItem={handleAddItem}
      modal={modal}
      toggleModal={toggleModal}
      nameHandler={(e) => {
        setName(e.target.value);
      }}
      detailsHandler={(e) => {
        setDetails(e.target.value);
      }}
      sizeHandler={(e) => {
        setSize(e.target.value);
      }}
      makerHandler={(e) => {
        setMaker(e.target.value);
      }}
      modelHandler={(e) => {
        setModel(e.target.value);
      }}
      linkHandler={(e) => {
        setLink(e.target.value);
      }}
      mapData={mapData}
      handleChangeItem={handleChangeItem}
      modalPut={modalPut}
      toggleModalPut={toggleModalPut}
      id={modalId}
    />
  );
}
