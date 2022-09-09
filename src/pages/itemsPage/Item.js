import React from "react";

function Item(props) {
  const { id, name, details, size, maker, model, link } = props.object;

  return (
    <div className="items">
      <span key={id}>
        <p>Name: {name}</p>
        <p>Details: {details}</p>
        <p>Size: {size}</p>
        <p>Maker: {maker}</p>
        <p>Model: {model}</p>
        <p>Link: {link}</p>
      </span>
      <div className="button">
        <button
          className="btn"
          onClick={() => {
            props.handleDeleteItem(id);
          }}
        >
          Del
        </button>
        <button
          className="btn"
          onClick={() => {
            props.toggleModalUpdate(id);
          }}
        >
          Upd
        </button>
      </div>
    </div>
  );
}

export default Item;
