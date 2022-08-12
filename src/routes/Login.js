import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Register from "./Register";
import OutlinedButton from "../components/Button";
import "../css/Login.css";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // Change false value to route to home page
  const [success, setSuccess] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await setUser("");
    //   setPwd("");
    //   setSuccess(true);
    // } catch (err) {}
  };

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Please Sign In to continue.</h1>
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
        Need an Account?
        <br />
        <span className="line">
          <Routes>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
          <a
            href="/register"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </a>
        </span>
      </p>
    </section>
  );
}
