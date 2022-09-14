import React, { useState } from "react";
import WishlistUpdateForm from "./WishlistUpdateForm";
import { deleteWishlist, updateWishlists } from "../../api/WishlistAxios";
import ModalWrapper from "../../components/ModalWrapper";

export default function UpdateList(props) {
  const object = props.object;
  const { id, name, details, items } = object;

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
  return (
    <div key={id} className="items">
      <ul>
        <li>N:{name}</li>
        <li>D:{details}</li>

        {items.map((item) => (
          <div key={item.id}>
            <li>Item: {item.name}</li>
          </div>
        ))}
      </ul>
      <div className="buttons">
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
      {modalUpdate && (
        <ModalWrapper close={toggleModalUpdate}>
          <WishlistUpdateForm
            id={id}
            wishlist={props.object}
            toggleModalUpdate={toggleModalUpdate}
            onSubmitHandler={onSubmitHandler}
          />
        </ModalWrapper>
      )}
    </div>
  );
}
