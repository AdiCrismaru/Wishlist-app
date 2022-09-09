import React from "react";
import { LoginProvider } from "../context/LoginContext";
import LoginUI from "../pages/loginPage/LoginUI";

export default function LoginRoute() {
  return (
    <LoginProvider>
      <LoginUI />
    </LoginProvider>
  );
}
