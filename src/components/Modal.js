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
  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Add new
      </button>

      {modal && (
        <div className="modall">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <input
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="List name"
            ></input>
            <div className="user-input">
              <input
                name="item"
                value={item}
                onChange={(e) => {
                  setItem(e.target.value);
                }}
                type="text"
                placeholder="Item"
              ></input>
              <form onSubmit={handleSubmit}>
                <input
                  name="link"
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                  type="text"
                  placeholder="Link"
                ></input>
              </form>
              <textarea
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Description"
              ></textarea>
            </div>
            <div className="btns-div">
              <button onClick={toggleModal}>Close</button>
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}
      {list.map((i) => (
        <div className="map-holder">
          <h3>{i.name}</h3>
          <div className="list-holder">
            <li>{i.item}</li>
            <input type="checkbox" />
          </div>
          <span>Link: {i.link}</span>
          <span>Detalii: {i.description}</span>
        </div>
      ))}
    </>
  );
}
