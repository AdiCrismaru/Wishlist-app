import React, { useContext } from "react";
import "./Wishlist.css";
import "./Modal.css";
import Wishlists from "../api/requests/wishlist/Wishlists";
import { ItemsContext } from "../context/ItemsContext";

function WishlistUI({
  modal,
  modalPut,
  handleAddItem,
  toggleModal,
  mapData,
  handleChangeItem,
  toggleModalPut,
}) {
  const { setName, setDetails, setSize, setMaker, setLink, setModel, id } =
    useContext(ItemsContext);

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
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Item name"
                autoComplete="off"
              ></input>
              <div className="user-input">
                <form onSubmit={handleAddItem}>
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

      {modalPut && (
        <div className="modall">
          <div onClick={toggleModalPut} className="overlay"></div>
          <div className="modal-content">
            <form
              onSubmit={() => {
                handleChangeItem(id);
              }}
            >
              <input
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Change name"
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
              <button onClick={toggleModalPut}>Close</button>
              <button
                onClick={() => {
                  handleChangeItem(id);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <Wishlists />
    </div>
  );
}

export default WishlistUI;
