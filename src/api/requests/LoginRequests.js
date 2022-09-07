import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import LoginUI from "../../pages/loginPage/LoginUI";
import axios from "../axios";

export default function LoginRequests() {
  const { email, password, setErrMsg } = useContext(LoginContext);

  let navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
      }

      setErrMsg(response.data.errors);
      console.log(response);

      if (response.data.token) {
        navigate("/wishlist");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid credentials, please try again.");
      }
    }
  };
  return <LoginUI handleSubmit={handleSubmit} />;
}
