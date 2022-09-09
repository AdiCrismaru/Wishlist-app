import React from "react";
import "./Modal.css";

function ModalWrapper({ children, toggle, handle }) {
  return (
    <div className="modall">
      <div onClick={toggle} className="overlay"></div>
      <div className="modal-content">
        {children}
        <div className="btns-div">
          <button onClick={toggle}>Close</button>
          <button onClick={handle}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default ModalWrapper;
