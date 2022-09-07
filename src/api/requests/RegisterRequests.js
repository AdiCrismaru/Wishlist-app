import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useNavigate } from "react-router-dom";
import RegisterUI from "../components/RegisterUI";
import "../components/Login&Register.css";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

function RegisterRequests() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const [data, setData] = useState({
    email,
    password: pwd,
    dob,
    name,
    phone,
  });

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // axios
    //   .post(REGISTER_URL, {
    //     email: data.email,
    //     password: data.password,
    //     dob: data.dob,
    //     name: data.name,
    //     phone: data.phone,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Please fill all required fields.");
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
    <RegisterUI
      handleSubmit={handleSubmit}
      handle={handle}
      errMsg={errMsg}
      className={errMsg ? "errmsg" : "offscreen"}
      setEmail={(e) => {
        setEmail(e.target.value);
        handle(e);
      }}
      dataEmail={data.email}
      setPwd={(e) => {
        setPwd(e.target.value);
        handle(e);
      }}
      dataPwd={data.password}
      setDob={(e) => {
        setDob(e.target.value);
        handle(e);
      }}
      dataDob={data.dob}
      setName={(e) => {
        setName(e.target.value);
        handle(e);
      }}
      dataName={data.name}
      setPhone={(e) => {
        setPhone(e.target.value);
        handle(e);
      }}
      dataPhone={data.phone}
    />
  );
}
