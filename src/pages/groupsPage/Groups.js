import React, { useState } from "react";
import { deleteGroup, updateGroup } from "../../api/GroupsAxios";
import ModalWrapper from "../../components/ModalWrapper";
import UpdateGroupForm from "./UpdateGroupForm";

export default function Groups({ groupsArray, setGroups }) {
  const [data, setData] = useState({});

  const [modal, setModal] = useState(false);

  const onSubmitHandler = (id, payload) => {
    updateGroup(id, payload)
      .then((res) => {
        if (res.status === 200)
          setData({ ...data, name: payload.name, details: payload.details });
        setGroups();
        toggleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id) => {
    deleteGroup(id)
      .then(() => {
        setGroups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  let groupObj;
  return (
    <>
      {groupsArray.map((group) => {
        groupObj = group; /// move map up one component if not working
        return (
          <div key={group.id} className="items">
            <ul>
              <li>N: {group.name}</li>
              <li>D: {group.details}</li>
            </ul>
            <div className="button">
              <button
                className="btn"
                onClick={() => {
                  deleteHandler(group.id);
                }}
              >
                Del
              </button>
              <button
                className="btn"
                onClick={() => {
                  toggleModal();
                }}
              >
                Upd
              </button>
            </div>
          </div>
        );
      })}

      {modal && (
        <ModalWrapper close={toggleModal}>
          <UpdateGroupForm
            id={groupObj.id} // const {id}=props.object
            group={groupObj} //group={object}
            onSubmitHandler={onSubmitHandler}
          />
        </ModalWrapper>
      )}
    </>
  );
}
