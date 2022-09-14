import React, { useState } from "react";
import { postGroup } from "../../api/GroupsAxios";
import ModalWrapper from "../../components/ModalWrapper";
import CreateGroupForm from "./CreateGroupForm";

export default function ModalAddGroup(props) {
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false);

  const postGroupHandler = (payload) => {
    postGroup(payload)
      .then((res) => {
        if (res.status === 200) {
          setData({
            ...data,
            name: payload.name,
            details: payload.details,
          });
          props.setGroups();

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
    <div>
      <button onClick={toggleModal} className="btn-modal">
        Add new
      </button>
      {modal && (
        <ModalWrapper close={toggleModal}>
          <CreateGroupForm postGroupHandler={postGroupHandler} />
        </ModalWrapper>
      )}
    </div>
  );
}
