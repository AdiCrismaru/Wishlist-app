import React from "react";
import { ProfileProvider } from "../context/ProfileContext";
import ProfileUI from "../pages/profilePage/ProfileUI";

export default function ProfileRoute() {
  return (
    <ProfileUI />
    // <ProfileProvider>
    // </ProfileProvider>
  );
}
