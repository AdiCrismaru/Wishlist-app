import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../components/Nav";
import Moment from "moment";
import "./Profile.css";
import {
  faUpRightFromSquare,
  faUser,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { useProfile, useProfileUpdate } from "../../context/ProfileContext";

function ProfileUI() {
  const { name, setName, email, phone, setPhone, dob, setDob, modal } =
    useProfile();
  const { toggleModal, updateHandle, logoutHandle } = useProfileUpdate();

  const formatDate = Moment(dob).format("Do-MMM-YYYY");
  return (
    <div>
      <Nav />

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
          <p>Name:</p>
          <p>{name}</p>
        </div>
        <hr />
        <div className="user-info">
          <p>Email:</p>
          <p>{email}</p>
        </div>
        <hr />
        <div className="user-info">
          <p>Phone:</p>
          <span>{phone}</span>
        </div>
        <hr />
        <div className="user-info">
          <p>Date of birth:</p>
          <p>{formatDate}</p>
        </div>
      </div>
      {modal && (
        <div className="modall">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <input
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Name"
              autoComplete="off"
            ></input>
            <div className="user-input">
              <form onSubmit={updateHandle}>
                <input
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  type="tel"
                  placeholder="Phone"
                  autoComplete="off"
                ></input>
                <input
                  name="dob"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  type="date"
                ></input>
              </form>
            </div>
            <div className="btns-div">
              <button onClick={toggleModal}>Close</button>
              <button onClick={updateHandle}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileUI;
