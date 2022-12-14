import { useLogin, useLoginUpdate } from "../../context/LoginContext";
import OutlinedButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import "./Login&Register.css";
import React from "react";

export default function LoginUI() {
  const { email, setEmail, password, setPassword, errMsg } = useLogin();
  const handleSubmit = useLoginUpdate();

  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Sign in to continue.</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        ></input>
        <OutlinedButton click={handleSubmit} text="Sign In" />
      </form>
      <p>
        Don't have an account?
        <br />
        <span className="line">
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
