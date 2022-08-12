import React from "react";
import "../css/Profile.css";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div>
      <Nav />

      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faUser} size="8x" />
              <h5 className="my-3">Adrian Crismaru</h5>
              <p className="text-muted mb-1">SEE WISHLISTS</p>
              <p className="text-muted mb-4">SEE GROUPS</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">First Name:</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">Adrian</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Last Name:</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">Crismaru</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email:</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">petricadeveloperu@example.com</p>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Username:</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">petricadeveloperu</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">Calea Motilor 33</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
