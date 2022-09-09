import React, { useState } from "react";
import { useWishlists } from "../../context/WishlistsContext";
import "../../components/Modal.css";

function ModalUpdateWishlist({ toggle, handle }) {
  const { setName, setDetails, setItemIds, itemData, itemIds } = useWishlists();
  const [holder, setHolder] = useState([]);

  return (
    <div className="modall">
      <div onClick={toggle} className="overlay"></div>
      <div className="modal-content">
        <form onSubmit={handle}>
          <div className="user-input">
            <input
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Wishlist name"
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
            <select name="name" id="dropdown" required multiple>
              {itemData.map((item) => {
                return (
                  <option
                    value={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      // setItemIds();
                      setItemIds([...itemIds, parseInt(e.target.value)]);
                      console.log(itemIds);
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
