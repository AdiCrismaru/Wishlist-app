import { React, useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OutlinedButton from "../components/Button";
import "../css/Login&Register.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

export default function Register() {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState();
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState();
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  return (
    <section className="register-container">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Create an account:</h1>
      <form>
        <label htmlFor="firstname">First name:</label>
        <input
          type="text"
          id="firstname"
          ref={userRef}
          autoComplete="off"
          required
        ></input>
        <label htmlFor="lastname">Last name:</label>
        <input type="text" id="lastname" autoComplete="off" required></input>
        <label htmlFor="dob">Date of birth:</label>
        <input type="date" id="dob" autoComplete="off" required></input>
        <label htmlFor="email">
          Email:
          <span className={validEmail ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validEmail || !email ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          onFocus={() => {
            setEmailFocus(true);
          }}
          onBlur={() => {
            setEmailFocus(false);
          }}
        ></input>
        <p
          id="emailnote"
          className={
            emailFocus && email && !validEmail ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Invalid email!
        </p>

        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
          onFocus={() => {
            setUserFocus(true);
          }}
          onBlur={() => {
            setUserFocus(false);
          }}
        ></input>
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
          Must begin with a letter. <br />
          Must contain a number.
        </p>

        <label htmlFor="password">
          Password:
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          required
          onFocus={() => {
            setPwdFocus(true);
          }}
          onBlur={() => {
            setPwdFocus(false);
          }}
        ></input>
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. <br />
          Must include uppercase and lowercase, a number and a special character
          !@#$%
        </p>
      </form>
      <div className="btns">
        <OutlinedButton
          text="Back"
          click={() => {
            navigate("/");
          }}
        />

        <OutlinedButton
          text="Register"
          click={() => {
            navigate("/wishlist");
          }}
        />
      </div>
    </section>
  );
}
