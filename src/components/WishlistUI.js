import React from "react";
import "./Wishlist.css";
import "./Modal.css";

function WishlistUI({
  name,
  details,
  size,
  maker,
  model,
  link,
  data,
  handleAddItem,
  modal,
  toggleModal,
  nameHandler,
  mapData,
  dlt,
}) {
  return (
    <div className="wishlist-container">
      <>
        <button onClick={toggleModal} className="btn-modal">
          Add new
        </button>

        {modal && (
          <div className="modall">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <input
                name="name"
                onChange={nameHandler}
                type="text"
                placeholder="Item name"
                autoComplete="off"
              ></input>
              <div className="user-input">
                <form onSubmit={handleAddItem}>
                  {/* <input
                  name="item"
                  value={item}
                  onChange={(e) => {
                    setItem(e.target.value);
                  }}
                  type="text"
                  placeholder="Item"
                ></input> */}
                  {/* <input
                    name="link"
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                    type="text"
                    placeholder="Link"
                  ></input> */}
                </form>
              </div>
              <div className="btns-div">
                <button onClick={toggleModal}>Close</button>
                <button onClick={handleAddItem}>Save</button>
              </div>
            </div>
          </div>
        )}
      </>
      {mapData}
      <div className="">
        <button onClick={dlt}>dlt</button>
        <p>{name}</p>
        <p>{details}</p>
        <p>{size}</p>
        <p>{maker}</p>
        <p>{model}</p>
        <p>{link}</p>
      </div>
    </div>
  );
}

export default WishlistUI;
