import React, { useState } from "react";
import WishlistAddForm from "./WishlistAddForm";
import ModalWrapper from "../../components/ModalWrapper";
import { postWishlist } from "../../api/WishlistAxios";

export default function ModalAddWishlist(props) {
  const [data, setData] = useState({});

  const [modal, setModal] = useState(false);

  const postWishlistHandler = (payload) => {
    postWishlist(payload)
      .then(() => {
        setData({
          ...data,
          wishlist: {
            name: payload.wishlist.name,
            details: payload.wishlist.details,
          },
          itemIds: [payload.itemIds],
        });
        props.setWishlist();

        toggleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <button onClick={toggleModal} className="btn btn-secondary">
          Add wishlist
        </button>
      </div>
      {modal && (
        <div className="z-index">
          <ModalWrapper close={toggleModal}>
            <WishlistAddForm postWishlistHandler={postWishlistHandler} />
          </ModalWrapper>
        </div>
      )}
    </>
  );
}
