import React, { useContext } from "react";
import { WishlistsContext } from "../context/WishlistsContext";
import "./Modal.css";

function WishlistModal({ toggle, handle }) {
  const { setName, setDetails, setItemIds } = useContext(WishlistsContext);
  return (
    <div className="modall">
      <div onClick={toggle} className="overlay"></div>
      <div className="modal-content">
        <input
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Wishlist name"
          autoComplete="off"
        ></input>
        <div className="user-input">
          <form onSubmit={handle}>
            <input
              name="details"
              onChange={(e) => {
                setDetails(e.target.value);
              }}
              type="text"
              placeholder="Details"
            ></input>
            <input
              name="IDs"
              onChange={(e) => {
                setItemIds(e.target.value);
              }}
              type="text"
              placeholder="IDs"
            ></input>
          </form>
        </div>
        <div className="btns-div">
          <button onClick={toggle}>Close</button>
          <button onClick={handle}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default WishlistModal;
