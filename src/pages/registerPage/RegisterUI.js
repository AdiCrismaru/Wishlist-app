import { useRegister, useRegisterUpdate } from "../../context/RegisterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutlinedButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { React, useRef } from "react";
import "./Login&Register.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function RegisterUI() {
  const {
    email,
    setEmail,
    validEmail,
    emailFocus,
    setEmailFocus,
    password,
    setPassword,
    validPassword,
    passwordFocus,
    setPasswordFocus,
    dob,
    setDob,
    name,
    setName,
    phone,
    setPhone,
    errMsg,
  } = useRegister();
  const { handle, handleSubmit, userRef } = useRegisterUpdate();

  const errRef = useRef();
  const navigate = useNavigate();

  return (
    <section className="register-container">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Create an account:</h1>
      <form>
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
          ref={userRef}
          autoComplete="off"
          onChange={(e) => {
            setEmail(e.target.value);
            handle(e);
          }}
          value={email}
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
        <label htmlFor="password">
          Password:
          <span className={validPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPassword || !password ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
            handle(e);
          }}
          value={password}
          required
          onFocus={() => {
            setPasswordFocus(true);
          }}
          onBlur={() => {
            setPasswordFocus(false);
          }}
        ></input>
        <p
          id="pwdnote"
          className={
            passwordFocus && !validPassword ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. <br />
          Must include uppercase and lowercase, a number and a special character
          !@#$%
        </p>
        <label htmlFor="dob">Date of birth:</label>
        <input
          type="date"
          id="dob"
          autoComplete="off"
          required
          onChange={(e) => {
            setDob(e.target.value);
            handle(e);
          }}
          value={dob}
        ></input>

        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          required
          onChange={(e) => {
            setName(e.target.value);
            handle(e);
          }}
          value={name}
        ></input>

        <label htmlFor="phone">Phone number:</label>
        <input
          type="tel"
          id="phone"
          autoComplete="off"
          required
          onChange={(e) => {
            setPhone(e.target.value);
            handle(e);
          }}
          value={phone}
        ></input>
      </form>
      <div className="btns">
        <OutlinedButton
          text="Back"
          click={() => {
            navigate("/");
          }}
        />
        <OutlinedButton text="Register" click={handleSubmit} />
      </div>
    </section>
  );
}
