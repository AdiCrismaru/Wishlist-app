import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfileUI(props) {
  const navigate = useNavigate();
  return (
    <div>
      <Nav />
      <div className="profile-container">
        <div className="w-25 mt-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faUser} size="8x" />
              <h5 className="my-3">{props.name}</h5>
              <a
                href="/"
                onClick={() => {
                  navigate("/");
                }}
              >
                Logout
              </a>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Name:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{props.name}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{props.email}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Password:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{props.password}</p>
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Phone:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{props.phone}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Date of birth:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{props.dob}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUI;
