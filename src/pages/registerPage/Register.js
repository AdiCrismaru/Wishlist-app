import { React, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OutlinedButton from "../../components/Button";
import "./Login&Register.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const REGISTER_URL = "/register";

export default function Register() {
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

  const [data, setData] = useState({
    email,
    password: pwd,
    dob,
    name,
    phone,
  });

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Please fill all the required fields.");
      return;
    }

    try {
      const response = await axios.post(REGISTER_URL, {
        email: data.email,
        password: data.password,
        dob: data.dob,
        name: data.name,
        phone: data.phone,
      });
      setErrMsg(response.data.errors);
      console.log(response.data);
      if (response.data.id) {
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email already in use.");
      } else {
        setErrMsg("Registration failed.");
      }
    }
  };

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
          value={data.email}
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
          onChange={(e) => {
            setPwd(e.target.value);
            handle(e);
          }}
          value={data.password}
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
          onChange={(e) => {
            setDob(e.target.value);
            handle(e);
          }}
          value={data.dob}
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
          value={data.name}
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
          value={data.phone}
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
