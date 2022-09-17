import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const LoginContext = createContext({});
export const LoginUpdateContext = createContext();

export function useLogin() {
  return useContext(LoginContext);
}
export function useLoginUpdate() {
  return useContext(LoginUpdateContext);
}

export function LoginProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
      }

      setErrMsg(response.data.errors);

      if (response.data.token) {
        navigate("/wishlist");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid credentials, please try again.");
      }
    }
  };
  return (
    <LoginContext.Provider
      value={{ email, setEmail, password, setPassword, errMsg, setErrMsg }}
    >
      <LoginUpdateContext.Provider value={handleSubmit}>
        {children}
      </LoginUpdateContext.Provider>
    </LoginContext.Provider>
  );
}
