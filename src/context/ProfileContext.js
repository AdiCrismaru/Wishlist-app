import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const ProfileContext = createContext({});
export const ProfileUpdateContext = createContext();

export function useProfile() {
  return useContext(ProfileContext);
}
export function useProfileUpdate() {
  return useContext(ProfileUpdateContext);
}

export function ProfileProvider({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const [modal, setModal] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/me", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setDob(response.data.dob);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateHandle = () => {
    axios
      .put(
        "/me",
        { name, phone, dob },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setName(res.data.name);
        setPhone(res.data.phone);
        setDob(res.data.dob);
        console.log(dob);
      })
      .catch((err) => {
        console.log(err);
      });
    toggleModal();
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  const logoutHandle = () => {
    navigate("/");
    localStorage.clear();
  };
  return (
    <ProfileContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
        dob,
        setDob,
        city,
        setCity,
        street,
        setStreet,
        zip,
        setZip,
        country,
        setCountry,
        modal,
        setModal,
      }}
    >
      <ProfileUpdateContext.Provider
        value={{ updateHandle, logoutHandle, toggleModal }}
      >
        {children}
      </ProfileUpdateContext.Provider>
    </ProfileContext.Provider>
  );
}
