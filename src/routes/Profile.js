import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  return (
    <div>
      <Nav />
      <h1>{username}</h1>
      <h1>Profile settings</h1>
      <a
        href="/"
        onClick={() => {
          navigate("/");
        }}
      >
        Logout
      </a>
    </div>
  );
}
