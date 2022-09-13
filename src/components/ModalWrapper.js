import React from "react";
import "./Modal.css";

function ModalWrapper({ children, close }) {
  return (
    <div className="modall">
      <div onClick={close} className="overlay"></div>
      <div className="modal-content">
        {children}
        <div className="btns-div">
          <button onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ModalWrapper;
