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
    <div className="col-sm-6 col-md-4 v my-3">
      <div
        className="card shadow-sm w-100"
        style={{ minHeight: 250, maxWidth: 300 }}
      >
        <div key={id} className="card-body">
          <h4 className="card-title text-center ">{name}</h4>
          <h6 className="card-subtitle mb-2 text-muted text-center">
            {details}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted text-center">
            Size: {size}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted text-center">
            Maker: {maker}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted text-center">
            Model: {model}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted text-center">
            Link: {link}
          </h6>

          <div className="button d-flex justify-content-between">
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteHandler(id);
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                toggleModalUpdate();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {modalPut && (
        <div className="z-index">
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
        </div>
      )}
    </div>
  );
}
