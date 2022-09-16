import React, { useState } from "react";
import {
  addGroupUsers,
  addGroupWishlist,
  deleteGroup,
  updateGroup,
} from "../../api/GroupsAxios";
import ModalWrapper from "../../components/ModalWrapper";
import UpdateGroupForm from "./UpdateGroupForm";

export default function Groups(props) {
  const group = props.group;
  const { id, name, details, users, wishlists } = group;

  const [data, setData] = useState({});
  const [dataUsers, setDataUsers] = useState({ userIds: [] });
  const [dataWishlists, setDataWishlists] = useState({ wishlistIds: [] });

  const [modal, setModal] = useState(false);

  const onSubmitHandler = (id, payload) => {
    updateGroup(id, payload)
      .then((res) => {
        if (res.status === 200)
          setData({ ...data, name: payload.name, details: payload.details });
        props.setGroups();
        toggleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postGroupUsersHandler = (id, payload) => {
    addGroupUsers(id, payload)
      .then(() => {
        setDataUsers({ ...dataUsers, userIds: payload.users });
      })
      .catch((err) => {
        console.log(err);
      });
    props.setGroups();
  };

  const postGroupWishlistsHandler = (id, payload) => {
    addGroupWishlist(id, payload)
      .then(() => {
        setDataWishlists({
          ...dataWishlists,
          wishlistIds: payload.wishlists,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    props.setGroups();
  };

  const deleteHandler = (id) => {
    deleteGroup(id)
      .then(() => {
        props.setGroups();
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
      <div key={id} className="col-sm-6 col-md-4 v my-2">
        <div
          className="card shadow-sm w-100"
          style={{ minHeight: 300, maxWidth: 300 }}
        >
          <div className="card-body">
            <h4 className="card-title text-center ">{name}</h4>
            <h5 className="card-subtitle mb-2  text-muted text-center">
              {details}
            </h5>
            <div>
              <h5 className="card-subtitle mb-2  text-center">Users:</h5>
              {users.map((user) => {
                return (
                  <div key={user.id}>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      {user.name}
                    </h6>
                  </div>
                );
              })}
            </div>
            <div>
              <h5 className="card-subtitle mb-2  text-center">Wishlists:</h5>
              {wishlists.map((list) => {
                return (
                  <div key={list.id}>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      {list.name}
                    </h6>
                  </div>
                );
              })}
            </div>
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
                  toggleModal();
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div className="z-index">
          <ModalWrapper close={toggleModal}>
            <UpdateGroupForm
              id={id}
              group={group}
              onSubmitHandler={onSubmitHandler}
              postGroupUsersHandler={postGroupUsersHandler}
              postGroupWishlistsHandler={postGroupWishlistsHandler}
            />
          </ModalWrapper>
        </div>
      )}
    </>
  );
}
