import React from "react";
import { useItems, useItemsUpdate } from "../../context/ItemsContext";
import ItemModal from "../../components/ItemModal";
import Item from "../../components/Item";
import "./Items.css";
import ModalWrapper from "../../components/ModalWrapper";
import ItemsForm from "./ItemsForm";

function ItemsUI() {
  const { data, name, details, size, maker, model, link, id, modal, modalPut } =
    useItems();
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

  return (
    <div className="wishlist-container">
      <button onClick={toggleModal} className="btn-modal">
        Add new
      </button>
      {modal && (
        <ModalWrapper handle={PostItem} toggle={toggleModal}>
          <ItemsForm />
        </ModalWrapper>
      )}

      {mapData}

      {modalPut && (
        <ModalWrapper
          handle={() => {
            UpdateItem(id);
          }}
          toggle={toggleModalUpdate}
        >
          <ItemsForm
            name={name}
            details={details}
            size={size}
            maker={maker}
            model={model}
            link={link}
            data={data}
          />
        </ModalWrapper>
      )}
      <h1>update values pass id</h1>
    </div>
  );
}

export default ItemsUI;
