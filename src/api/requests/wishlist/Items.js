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

  const [data, setData] = useState({
    name,
    details,
    size,
    maker,
    model,
    link,
  });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/items", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.items);
      console.log(data);
    };
    getData().catch((err) => {
      console.log(err);
    });
  }, []);

  const handleDeleteItem = (id) => {
    axios
      .delete(`/item / ${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dlt = () => {
    handleDeleteItem(90);
  };

  const mapData = Array.from(data).map(({ id, name }) => {
    return (
      <div>
        <p key={id}>{name}</p>
        <button onClick={handleDeleteItem}>del</button>
      </div>
    );
  });

  // const handle = (e) => {
  //   const newdata = { ...data };
  //   newdata[e.target.id] = e.target.value;
  //   setData(newdata);
  // };

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
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    toggleModal();
  };
  const toggleModal = () => {
    setModal(!modal);
    console.log(data);
  };

  return (
    <WishlistUI
      name={name}
      details={details}
      size={size}
      maker={maker}
      model={model}
      link={link}
      data={data}
      // handle={handle}
      handleAddItem={handleAddItem}
      modal={modal}
      toggleModal={toggleModal}
      nameHandler={(e) => {
        setName(e.target.value);
      }}
      mapData={mapData}
      dlt={dlt}
    />
  );
}
