import React, { useEffect, useState } from "react";
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
import ModalWrapper from "../../components/ModalWrapper";
import ProfileUpdateModal from "../../components/ProfileUpdateModal";
import { useNavigate } from "react-router-dom";
import { getProfileInfo, putProfileInfo } from "../../api/ProfileAxios";

function ProfileUI() {
  const [data, setData] = useState({});

  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getProfileInfo()
      .then((res) => {
        setData(res.data);
      })
      .catch((res) => console.log(res));
  }, []);

  const onSubmitHandler = (payload) => {
    putProfileInfo(payload)
      .then((res) => {
        console.log(res);
        toggleModal();
        setData({
          ...data,
          name: payload.name,
          phone: payload.phone,
          dob: payload.dob,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  const logoutHandle = () => {
    navigate("/");
    localStorage.clear();
  };
  const formatDate = Moment(data.dob).format("Do-MMM-YYYY");
  console.log(Date.now());
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
      {modal && (
        <ModalWrapper close={toggleModal}>
          <ProfileUpdateModal user={data} onSubmitHandler={onSubmitHandler} />
        </ModalWrapper>
      )}
    </div>
  );
}

export default ProfileUI;
