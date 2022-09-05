import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, item, link, description };
    if (name && item && link && description) {
      setList((ls) => [...ls, data]);
      setName("");
      setItem("");
      setLink("");
      setDescription("");
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  return;
}
