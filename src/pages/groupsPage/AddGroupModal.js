import ModalWrapper from "../../components/ModalWrapper";
import { postGroup } from "../../api/GroupsAxios";
import CreateGroupForm from "./CreateGroupForm";
import React, { useState } from "react";

export default function AddGroupModal(props) {
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
    <div className="d-flex justify-content-center">
      <button onClick={toggleModal} className="btn btn-secondary">
        Add new
      </button>
      {modal && (
        <div className="z-index">
          <ModalWrapper close={toggleModal}>
            <CreateGroupForm postGroupHandler={postGroupHandler} />
          </ModalWrapper>
        </div>
      )}
    </div>
  );
}
