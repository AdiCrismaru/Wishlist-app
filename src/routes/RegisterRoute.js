import React from "react";
import { RegisterProvider } from "../context/RegisterContext";
import RegisterUI from "../pages/registerPage/RegisterUI";

export default function RegisterRoute() {
  return (
    <RegisterProvider>
      <RegisterUI />
    </RegisterProvider>
  );
}
