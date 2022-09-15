import React from "react";
import "./Modal.css";

function ModalWrapper({ children, close }) {
  return (
    <div className="modall">
      <div onClick={close} className="overlay"></div>
      <div className="modal-content">
        {children}
        <div className="d-flex justify-content-center">
          <button onClick={close} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalWrapper;
