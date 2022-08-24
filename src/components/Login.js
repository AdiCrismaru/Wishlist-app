import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegisterPage from "../routes/RegisterPage";
import OutlinedButton from "./Button";
import "./Login&Register.css";

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Sign in to continue.</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        ></input>
        <OutlinedButton
          click={() => {
            navigate("/wishlist");
          }}
          text="Sign In"
        />
      </form>
      <p>
        Don't have an account?
        <br />
        <span className="line">
          <Routes>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Routes>
          <a
            href="/register"
            onClick={() => {
              navigate("/register");
            }}
          >
            Create one
          </a>
        </span>
      </p>
    </section>
  );
}
