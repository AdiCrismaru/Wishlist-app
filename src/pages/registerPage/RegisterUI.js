import { React, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OutlinedButton from "../../components/Button";
import "./Login&Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

export default function Register(props) {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    userRef.current.focus();
  }, []);
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
  }, [email, pwd]);

  // const [data, setData] = useState({
  //   email,
  //   password: pwd,
  //   dob,
  //   name,
  //   phone,
  // });

  return (
    <section className="register-container">
      <p ref={errRef} className={props.className}>
        {props.errMsg}
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
          onChange={props.setEmail}
          value={props.dataEmail}
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
          onChange={props.setPwd}
          value={props.dataPwd}
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
        <label htmlFor="dob">Date of birth:</label>
        <input
          type="date"
          id="dob"
          autoComplete="off"
          required
          onChange={props.setDob}
          value={props.dataDob}
        ></input>

        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          required
          onChange={props.setName}
          value={props.dataName}
        ></input>

        <label htmlFor="phone">Phone number:</label>
        <input
          type="tel"
          id="phone"
          autoComplete="off"
          required
          onChange={props.setPhone}
          value={props.dataPhone}
        ></input>
      </form>
      <div className="btns">
        <OutlinedButton
          text="Back"
          click={() => {
            navigate("/");
          }}
        />

        <OutlinedButton text="Register" click={props.handleSubmit} />
      </div>
    </section>
  );
}
