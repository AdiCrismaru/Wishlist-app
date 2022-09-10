import React from "react";
import { useWishlists } from "../../context/WishlistsContext";

export default function ModalAddWishlist({ toggle, handle }) {
  const { setName, setDetails, itemIds, setItemIds, itemData } = useWishlists();

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
            placeholder="Wishlist name"
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
              autoComplete="off"
            ></input>
            <label htmlFor="dropdown">Choose items:</label>
            <select name="name" id="dropdown" required multiple>
              {itemData.map((object) => {
                return (
                  <option
                    value={object.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setItemIds([...itemIds, parseInt(e.target.value)]);
                      console.log(itemIds);
                    }}
                  >
                    {object.name}
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
