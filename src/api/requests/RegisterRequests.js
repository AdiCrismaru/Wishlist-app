import React, { useEffect, useContext, useRef } from "react";
import RegisterUI from "../../pages/registerPage/RegisterUI";
import { RegisterContext } from "../../context/RegisterContext";
import "../../pages/registerPage/Login&Register.css";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

export default function RegisterRequests() {
  const {
    email,
    setValidEmail,
    password,
    setValidPassword,
    setErrMsg,
    data,
    setData,
  } = useContext(RegisterContext);

  const navigate = useNavigate();
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Please fill all the required fields.");
      return;
    }

    try {
      const response = await axios.post("/register", {
        email: data.email,
        password: data.password,
        dob: data.dob,
        name: data.name,
        phone: data.phone,
      });
      setErrMsg(response.data.errors);
      console.log(response.data);
      if (response.data.id) {
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email already in use.");
      } else {
        setErrMsg("Registration failed.");
      }
    }
  };
  return (
    <RegisterUI handleSubmit={handleSubmit} handle={handle} userRef={userRef} />
  );
}
