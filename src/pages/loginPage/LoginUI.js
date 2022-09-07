import React from "react";
import { useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OutlinedButton from "../../components/Button";
import "./Login&Register.css";
import { LoginContext } from "../../context/LoginContext";

export default function LoginUI({ handleSubmit }) {
  const { email, setEmail, password, setPassword, errMsg } =
    useContext(LoginContext);

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
