import React from "react";
import "./Modal.css";

function ModalWrapper({ children, save, close }) {
  return (
    <div className="modall">
      <div onClick={close} className="overlay"></div>
      <div className="modal-content">
        {children}
        <div className="btns-div">
          <button onClick={close}>Close</button>
          {/* <button onClick={save}>Save</button> */}
        </div>
      </div>
    </div>
  );
}

export default ModalWrapper;
