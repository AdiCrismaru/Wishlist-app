import React from "react";
import {
  faUpRightFromSquare,
  faUser,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../components/Nav";
import "./Profile.css";
import Moment from "moment";

function ProfileUI({
  name,
  email,
  phone,
  dob,
  modal,

  toggleModal,
  handleSubmit,
  logoutHandle,
  changeNameHandler,
  changePhoneHandler,
  changeDobHandler,
}) {
  const formatDate = Moment(dob).format("Do-MMM-YYYY");

  return (
    <div>
      <Nav />

      {modal && (
        <div className="modall">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <input
              name="name"
              value={name}
              onChange={changeNameHandler}
              type="text"
              placeholder="Name"
              autoComplete="off"
            ></input>
            <div className="user-input">
              <form onSubmit={handleSubmit}>
                <input
                  name="phone"
                  value={phone}
                  onChange={changePhoneHandler}
                  type="tel"
                  placeholder="Phone"
                  autoComplete="off"
                ></input>
                <input
                  name="dob"
                  value={dob}
                  onChange={changeDobHandler}
                  type="date"
                ></input>
              </form>
            </div>
            <div className="btns-div">
              <button onClick={toggleModal}>Discard</button>
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="user-container">
        <div className="top-div">
          <FontAwesomeIcon icon={faUser} size="8x" />
        </div>
        <hr />
        <div className="user-info">
          <a href="/" onClick={logoutHandle}>
            <FontAwesomeIcon icon={faUpRightFromSquare} />
            Logout
          </a>
          <span className="edit" onClick={toggleModal}>
            <FontAwesomeIcon icon={faUserPen} /> Edit
          </span>
        </div>
        <hr />
        <div className="user-info">
          <p className="">Name:</p>
          <p className="">{name}</p>
        </div>
        <hr />
        <div className="user-info">
          <p className="">Email:</p>
          <p className="">{email}</p>
        </div>
        <hr />
        <div className="user-info">
          <p className="">Phone:</p>
          <span className="">{phone}</span>
        </div>
        <hr />
        <div className="user-info">
          <p className="">Date of birth:</p>
          <p className="">{formatDate}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileUI;
