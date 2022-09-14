import React, { useState } from "react";
import ModalWrapper from "../../components/ModalWrapper";
import ItemUpdateForm from "./ItemUpdateForm";
import { updateItems, deleteItems } from "../../api/ItemsAxios";

export default function UpdateItem(props) {
  const { id, name, details, size, maker, model, link } = props.object;

  const [modalPut, setModalPut] = useState(false);

  const onSubmitHandler = (id, payload) => {
    updateItems(id, payload)
      .then(() => {
        props.data.find((elem) => {
          if (elem.id === id) {
            elem.name = payload.name;
            elem.details = payload.details;
            elem.size = payload.size;
            elem.maker = payload.maker;
            elem.model = payload.model;
            elem.link = payload.link;
          }
        });
        toggleModalUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id) => {
    deleteItems(id)
      .then(() => {
        props.setItemsList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModalUpdate = () => {
    setModalPut(!modalPut);
  };

  return (
    <div key={id} className="items">
      <ul>
        <li>Name: {name}</li>
        <li>Details: {details}</li>
        <li>Size: {size}</li>
        <li>Maker: {maker}</li>
        <li>Model: {model}</li>
        <li>Link: {link}</li>
      </ul>
      <div className="button">
        <button
          className="btn"
          onClick={() => {
            deleteHandler(id);
          }}
        >
          Del
        </button>
        <button
          className="btn"
          onClick={() => {
            toggleModalUpdate();
          }}
        >
          Upd
        </button>
      </div>

      {modalPut && (
        <ModalWrapper
          close={() => {
            setModalPut(false);
          }}
        >
          <ItemUpdateForm
            id={id}
            item={props.object}
            toggleModalUpdate={toggleModalUpdate}
            onSubmitHandler={onSubmitHandler}
          />
        </ModalWrapper>
      )}
    </div>
  );
}
