import React, { useEffect, useState } from "react";
import ProfileUI from "../components/ProfileUI";
import axios from "./axios";

function ProfileGET() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/me", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ProfileUI
      name={data.name}
      email={data.email}
      password={data.password}
      phone={data.phone}
      dob={data.dob}
    />
  );
}

export default ProfileGET;
