import React, { useState } from "react";
import ItemAddForm from "./ItemAddForm";
import ModalWrapper from "../../components/ModalWrapper";
import { postItems } from "../../api/ItemsAxios";

export default function ModalAddItem(props) {
  const [data, setData] = useState({});

  const [modal, setModal] = useState(false);

  const postItemHandler = (payload) => {
    postItems(payload)
      .then((res) => {
        if (res.status === 200) {
          setData({
            ...data,
            name: payload.name,
            details: payload.details,
            size: payload.size,
            maker: payload.maker,
            model: payload.model,
            link: payload.link,
          });
          props.setItemsList();

          toggleModal();
        }
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
      <button onClick={toggleModal} className="btn-modal">
        Add new
      </button>

      {modal && (
        <ModalWrapper close={toggleModal}>
          <ItemAddForm postItemHandler={postItemHandler} />
        </ModalWrapper>
      )}
    </>
  );
}
