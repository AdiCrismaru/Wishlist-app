import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileUI from "../../../components/ProfileUI";
import axios from "../../axios";

function ProfileGET() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const [modal, setModal] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/me", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setDob(response.data.dob);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    axios
      .put(
        "/me",
        { name, phone, dob },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setName(res.data.name);
        setPhone(res.data.phone);
        setDob(res.data.dob);
        console.log(dob);
      })
      .catch((err) => {
        console.log(err);
      });
    toggleModal();
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  const logoutHandle = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <ProfileUI
      name={name}
      email={email}
      phone={phone}
      modal={modal}
      toggleModal={toggleModal}
      dob={dob}
      handleSubmit={handleSubmit}
      logoutHandle={logoutHandle}
      changeNameHandler={(e) => {
        setName(e.target.value);
      }}
      changePhoneHandler={(e) => {
        setPhone(e.target.value);
      }}
      changeDobHandler={(e) => {
        setDob(e.target.value);
      }}
    />
    // <ProfileUI
    //   name={data.name}
    //   email={data.email}
    //   password={data.password}
    //   phone={data.phone}
    //   dob={Date(data.dob)}
    //   data={data}
    // />
  );
}

export default ProfileGET;
