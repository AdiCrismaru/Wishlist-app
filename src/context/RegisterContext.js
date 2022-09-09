import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const RegisterContext = createContext({});
export const RegisterUpdateContext = createContext();

export function useRegister() {
  return useContext(RegisterContext);
}
export function useRegisterUpdate() {
  return useContext(RegisterUpdateContext);
}

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

export function RegisterProvider({ children }) {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [errMsg, setErrMsg] = useState();

  const [data, setData] = useState({});

  const navigate = useNavigate();
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Please fill all the required fields.");
      return;
    }

    try {
      const response = await axios.post("/register", {
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
    <RegisterContext.Provider
      value={{
        email,
        setEmail,
        validEmail,
        setValidEmail,
        emailFocus,
        setEmailFocus,
        password,
        setPassword,
        validPassword,
        setValidPassword,
        passwordFocus,
        setPasswordFocus,
        dob,
        setDob,
        name,
        setName,
        phone,
        setPhone,
        errMsg,
        setErrMsg,
        data,
        setData,
      }}
    >
      <RegisterUpdateContext.Provider value={{ handleSubmit, handle, userRef }}>
        {children}
      </RegisterUpdateContext.Provider>
    </RegisterContext.Provider>
  );
}
