import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OutlinedButton from "../../components/Button";
import "./Login&Register.css";

export default function LoginUI(props) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState();

  const userRef = useRef();
  const errRef = useRef();

  let navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  return (
    <section>
      <p ref={errRef} className={props.className}>
        {props.errMsg}
      </p>
      <h1>Sign in to continue.</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={props.setEmail}
          value={props.email}
          required
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={props.setPwd}
          value={props.pwd}
          required
        ></input>
        <OutlinedButton click={props.handleSubmit} text="Sign In" />
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
