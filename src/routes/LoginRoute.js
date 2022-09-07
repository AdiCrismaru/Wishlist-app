import React, { useState } from "react";
import LoginRequests from "../api/requests/LoginRequests";
import { LoginContext } from "../context/LoginContext";

export default function LoginRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  return (
    <LoginContext.Provider
      value={{ email, setEmail, password, setPassword, errMsg, setErrMsg }}
    >
      <LoginRequests />;
    </LoginContext.Provider>
  );
}
