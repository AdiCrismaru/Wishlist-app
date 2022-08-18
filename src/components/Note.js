import React from "react";
import "./Note.css";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Note({ id, text, date, handleDeleteNote }) {
  return (
    <div className="note">
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1x"
        />
      </div>
    </div>
  );
}

export default Note;
