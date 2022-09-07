import React, { useContext } from "react";
import { ItemsContext } from "../context/ItemsContext";
import "./Modal.css";

export default function ItemModal({ toggle, handle }) {
  const { setName, setDetails, setSize, setMaker, setLink, setModel } =
    useContext(ItemsContext);
  return (
    <div className="modall">
      <div onClick={toggle} className="overlay"></div>
      <div className="modal-content">
        <form onSubmit={handle}>
          <input
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Item name"
            autoComplete="off"
          ></input>
          <div className="user-input">
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
        <div className="btns-div">
          <button onClick={toggle}>Close</button>
          <button onClick={handle}>Save</button>
        </div>
      </div>
    </div>
  );
}
