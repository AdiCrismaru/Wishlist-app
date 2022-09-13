import React, { useEffect, useState } from "react";
import UpdateItem from "./UpdateItem";
import "./Items.css";
import { getItems } from "../../api/ItemsAxios";
import ModalAddItem from "./ModalAddItem";

function ItemsUI() {
  const [data, setData] = useState([]);

  const setItemsList = () => {
    getItems()
      .then((res) => {
        setData(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setItemsList();
  }, []);

  const mapData = data.map((object) => {
    return (
      <UpdateItem data={data} object={object} setItemsList={setItemsList} />
    );
  });

  return (
    <div className="wishlist-container">
      <ModalAddItem setItemsList={setItemsList} />

      {mapData}
    </div>
  );
}

export default ItemsUI;
