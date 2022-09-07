import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginUI from "../../pages/loginPage/LoginUI";
import axios from "../axios";

export default function LoginRequests() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        email: email,
        password: pwd,
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
  return (
    <LoginUI
      handleSubmit={handleSubmit}
      setEmail={(e) => setEmail(e.target.value)}
      email={email}
      setPwd={(e) => setPwd(e.target.value)}
      pwd={pwd}
      errMsg={errMsg}
      className={errMsg ? "errmsg" : "offscreen"}
    />
  );
}
