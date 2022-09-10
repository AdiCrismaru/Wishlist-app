import React, { useState } from "react";
import { useWishlists } from "../../context/WishlistsContext";
import "../../components/Modal.css";
import { MultiSelect } from "primereact/multiselect";

function ModalUpdateWishlist({ toggle, handle }) {
  const {
    nameUpdate,
    setNameUpdate,
    detailsUpdate,
    setDetailsUpdate,
    itemIdsUpdate,
    setItemIdsUpdate,
    itemData,
    itemIdHolder,
  } = useWishlists();

  return (
    <div className="modall">
      <div onClick={toggle} className="overlay"></div>
      <div className="modal-content">
        <form onSubmit={handle}>
          <div className="user-input">
            <input
              name="name"
              value={nameUpdate}
              onChange={(e) => {
                setNameUpdate(e.target.value);
              }}
              type="text"
              placeholder="Wishlist name"
              autoComplete="off"
            ></input>
            <input
              name="details"
              value={detailsUpdate}
              onChange={(e) => {
                setDetailsUpdate(e.target.value);
              }}
              type="text"
              placeholder="Details"
            ></input>
            <select name="name" id="dropdown" required multiple>
              {itemData.map((item) => {
                return (
                  <option
                    value={item.id}
                    onClick={(e) => {
                      console.log(item.id);
                      e.preventDefault();
                      setItemIdsUpdate([
                        ...itemIdsUpdate,
                        parseInt(e.target.value),
                      ]);
                    }}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
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

export default ModalUpdateWishlist;
