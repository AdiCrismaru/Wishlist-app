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
  detailsHandler,
  sizeHandler,
  makerHandler,
  modelHandler,
  linkHandler,
  mapData,
  handleChangeItem,
  modalPut,
  toggleModalPut,
  id,
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
                  <input
                    name="details"
                    onChange={detailsHandler}
                    type="text"
                    placeholder="Details"
                  ></input>
                  <input
                    name="size"
                    onChange={sizeHandler}
                    type="text"
                    placeholder="Size"
                  ></input>
                  <input
                    name="maker"
                    onChange={makerHandler}
                    type="text"
                    placeholder="Maker"
                  ></input>
                  <input
                    name="model"
                    onChange={modelHandler}
                    type="text"
                    placeholder="Model"
                  ></input>
                  <input
                    name="link"
                    onChange={linkHandler}
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
            <input
              name="name"
              onChange={nameHandler}
              type="text"
              placeholder="Change name"
              autoComplete="off"
            ></input>
            <div className="user-input">
              <form
                onSubmit={() => {
                  handleChangeItem(id);
                }}
              >
                <input
                  name="details"
                  onChange={detailsHandler}
                  type="text"
                  placeholder="Details"
                ></input>
                <input
                  name="size"
                  onChange={sizeHandler}
                  type="text"
                  placeholder="Size"
                ></input>
                <input
                  name="maker"
                  onChange={makerHandler}
                  type="text"
                  placeholder="Maker"
                ></input>
                <input
                  name="model"
                  onChange={modelHandler}
                  type="text"
                  placeholder="Model"
                ></input>
                <input
                  name="link"
                  onChange={linkHandler}
                  type="text"
                  placeholder="Link"
                ></input>
              </form>
            </div>
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
    </div>
  );
}

export default WishlistUI;
