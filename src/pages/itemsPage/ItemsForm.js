import React from "react";
import "../../components/Modal.css";
import { useItems, useItemsUpdate } from "../../context/ItemsContext";

function ItemsForm() {
  const { setName, setDetails, setSize, setMaker, setModel, setLink } =
    useItems();
  const { PostItem } = useItemsUpdate;
  return (
    <form onSubmit={PostItem}>
      <div className="user-input">
        <input
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Item name"
          autoComplete="off"
        ></input>
        <input
          name="details"
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          type="text"
          placeholder="Details"
        ></input>
        <input
          name="size"
          onChange={(e) => {
            setSize(e.target.value);
          }}
          type="text"
          placeholder="Size"
        ></input>
        <input
          name="maker"
          onChange={(e) => {
            setMaker(e.target.value);
          }}
          type="text"
          placeholder="Maker"
        ></input>
        <input
          name="model"
          onChange={(e) => {
            setModel(e.target.value);
          }}
          type="text"
          placeholder="Model"
        ></input>
        <input
          name="link"
          onChange={(e) => {
            setLink(e.target.value);
          }}
          type="text"
          placeholder="Link"
        ></input>
      </div>
    </form>
  );
}

export default ItemsForm;
