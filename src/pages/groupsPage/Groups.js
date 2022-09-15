import React, { useState } from "react";
import { addGroupUsers, deleteGroup, updateGroup } from "../../api/GroupsAxios";
import ModalWrapper from "../../components/ModalWrapper";
import AddUsersForm from "./AddUsersForm";
import UpdateGroupForm from "./UpdateGroupForm";

export default function Groups({ groupsArray, setGroups }) {
  const [data, setData] = useState({});

  const [dataUsers, setDataUsers] = useState({ userIds: [] });

  const [modal, setModal] = useState(false);
  const [modalAddUsers, setModalAddUsers] = useState(false);

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

  const postGroupUsersHandler = (id, payload) => {
    console.log(payload);
    addGroupUsers(id, payload)
      .then((res) => {
        console.log(res);
        setDataUsers({ ...dataUsers, userIds: payload.groups.users });
      })
      .catch((err) => {
        console.log(err);
      });
    setGroups();
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

  const toggleModalAddUsers = () => {
    setModalAddUsers(!modalAddUsers);
  };

  let groupObj;
  return (
    <>
      {groupsArray.map((group) => {
        groupObj = group;
        return (
          <div key={group.id} className="items">
            <ul>
              <li>N: {group.name}</li>
              <li>D: {group.details}</li>
            </ul>
            <div>
              Users:
              {group.users.map((user) => {
                return (
                  <ul key={user.id}>
                    <li>{user.name}</li>
                  </ul>
                );
              })}
            </div>
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
              <button
                className="btn"
                onClick={() => {
                  toggleModalAddUsers();
                }}
              >
                Add Users
              </button>
            </div>
          </div>
        );
      })}
      {/* {users.map()} // Map users after post */}

      {modal && (
        <ModalWrapper close={toggleModal}>
          <UpdateGroupForm
            id={groupObj.id} // const {id}=props.object
            group={groupObj} //group={object}
            onSubmitHandler={onSubmitHandler}
            postGroupUsersHandler={postGroupUsersHandler}
          />
        </ModalWrapper>
      )}

      {modalAddUsers && (
        <ModalWrapper close={toggleModalAddUsers}>
          <AddUsersForm />
        </ModalWrapper>
      )}
    </>
  );
}
