import React, { useEffect } from "react";
import { useItems, useItemsUpdate } from "../../context/ItemsContext";
import ItemModal from "../../components/ItemModal";
import Item from "./Item";
import "./Items.css";
import ModalWrapper from "../../components/ModalWrapper";
import ItemsForm from "./ItemsForm";
import { getItems } from "../../api/ItemsAxios";

function ItemsUI() {
  const {
    data,
    setNameUpdate,
    nameUpdate,
    setDetailsUpdate,
    detailsUpdate,
    setSizeUpdate,
    sizeUpdate,
    setMakerUpdate,
    makerUpdate,
    setModelUpdate,
    modelUpdate,
    setLinkUpdate,
    linkUpdate,
    id,
    modal,
    modalPut,
    setModalPut,
  } = useItems();
  const { PostItem, UpdateItem, DeleteItem, toggleModal, toggleModalUpdate } =
    useItemsUpdate();

  const mapData = data.map((object) => {
    return (
      <Item
        object={object}
        handleDeleteItem={DeleteItem}
        toggleModalUpdate={toggleModalUpdate}
      />
    );
  });

  useEffect(() => {
    getItems().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="wishlist-container">
      <button onClick={toggleModal} className="btn-modal">
        Add new
      </button>
      {modal && (
        <ModalWrapper save={PostItem} close={toggleModal}>
          <ItemsForm save={PostItem} />
        </ModalWrapper>
      )}

      {mapData}

      {modalPut && (
        <ModalWrapper
          save={() => {
            UpdateItem(id);
          }}
          close={() => {
            setModalPut(false);
          }}
        >
          <form onSubmit={PostItem}>
            <div className="user-input">
              <input
                name="name"
                value={nameUpdate}
                onChange={(e) => {
                  setNameUpdate(e.target.value);
                }}
                type="text"
                placeholder="Item name"
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
              <input
                name="size"
                value={sizeUpdate}
                onChange={(e) => {
                  setSizeUpdate(e.target.value);
                }}
                type="text"
                placeholder="Size"
              ></input>
              <input
                name="maker"
                value={makerUpdate}
                onChange={(e) => {
                  setMakerUpdate(e.target.value);
                }}
                type="text"
                placeholder="Maker"
              ></input>
              <input
                name="model"
                value={modelUpdate}
                onChange={(e) => {
                  setModelUpdate(e.target.value);
                }}
                type="text"
                placeholder="Model"
              ></input>
              <input
                name="link"
                value={linkUpdate}
                onChange={(e) => {
                  setLinkUpdate(e.target.value);
                }}
                type="text"
                placeholder="Link"
              ></input>
            </div>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
}

export default ItemsUI;
