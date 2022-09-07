import React, { useState } from "react";
import { RegisterContext } from "../context/RegisterContext";
import RegisterRequests from "../api/requests/RegisterRequests";

export default function RegisterRoute() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [errMsg, setErrMsg] = useState();

  const [data, setData] = useState({});

  return (
    <RegisterContext.Provider
      value={{
        email,
        setEmail,
        validEmail,
        setValidEmail,
        emailFocus,
        setEmailFocus,
        password,
        setPassword,
        validPassword,
        setValidPassword,
        passwordFocus,
        setPasswordFocus,
        dob,
        setDob,
        name,
        setName,
        phone,
        setPhone,
        errMsg,
        setErrMsg,
        data,
        setData,
      }}
    >
      <RegisterRequests />
    </RegisterContext.Provider>
  );
}
