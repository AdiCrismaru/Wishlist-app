import React from "react";

function List(props) {
  const { id, name, details, items } = props.object;
  return (
    <div className="items">
      <span key={id}>
        <p>{name}</p>
        <p>{details}</p>
        <p>{items}</p>
      </span>
      <button
        onClick={() => {
          props.DELETEhandler(id);
        }}
      >
        D
      </button>
      <button
        onClick={() => {
          props.toggleModalUpdateItem(id);
        }}
      >
        C
      </button>
    </div>
  );
}

export default List;
