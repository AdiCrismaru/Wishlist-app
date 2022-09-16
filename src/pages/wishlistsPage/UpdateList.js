import React, { useState } from "react";
import WishlistUpdateForm from "./WishlistUpdateForm";
import { deleteWishlist, updateWishlists } from "../../api/WishlistAxios";
import ModalWrapper from "../../components/ModalWrapper";

export default function UpdateList(props) {
  const object = props.object;
  const { id, name, details, items } = object;
  console.log(object);

  const [modalUpdate, setModalUpdate] = useState(false);

  const onSubmitHandler = (id, payload) => {
    updateWishlists(id, payload)
      .then(() => {
        props.data.find((elem) => {
          if (elem.id === id) {
            elem.name = payload.name;
            elem.details = payload.details;
            elem.itemIds = payload.itemIds;
          }
        });

        props.setWishlist();
        toggleModalUpdate(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id) => {
    deleteWishlist(id)
      .then(() => {
        props.setWishlist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };
  console.log(items);
  return (
    <div key={id} className="col-sm-6 col-md-4 v my-2">
      <div
        className="card shadow-sm w-100"
        style={{ minHeight: 300, maxWidth: 300 }}
      >
        <div className="card-body">
          <h4 className="card-title text-center ">{name}</h4>
          <h5 className="card-subtitle mb-2  text-center">{details}</h5>
          {items.map((item) => {
            return (
              <div key={item.item.id}>
                <h6 className="card-subtitle mb-2 text-muted text-center">
                  {item.item.name}
                </h6>
              </div>
            );
          })}
          <div className="d-flex justify-content-between">
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

      {modalUpdate && (
        <div className="z-index">
          <ModalWrapper close={toggleModalUpdate}>
            <WishlistUpdateForm
              id={id}
              wishlist={props.object}
              toggleModalUpdate={toggleModalUpdate}
              onSubmitHandler={onSubmitHandler}
            />
          </ModalWrapper>
        </div>
      )}
    </div>
  );
}
