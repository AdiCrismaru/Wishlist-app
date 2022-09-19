import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "moment";
import "./Profile.css";
import {
  faUpRightFromSquare,
  faUser,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";

function ProfileData({ data, toggleModal }) {
  const logoutHandle = () => {
    navigate("/");
    localStorage.clear();
  };

  const navigate = useNavigate();
  const formatDate = Moment(data.dob).format("Do-MMM-YYYY");

  return (
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
        <p>{data.name}</p>
      </div>
      <hr />
      <div className="user-info">
        <p>Email:</p>
        <p>{data.email}</p>
      </div>
      <hr />
      <div className="user-info">
        <p>Phone:</p>
        <span>{data.phone}</span>
      </div>
      <hr />
      <div className="user-info">
        <p>Date of birth:</p>
        <p>{formatDate}</p>
      </div>
    </div>
  );
}

export default ProfileData;
