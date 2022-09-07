import React from "react";

function Item(props) {
  const { id, name, details, size, maker, model, link } = props.object;

  return (
    <div className="items">
      <span key={id}>
        <p>ID: {id}</p>
        <p>Name: {name}</p>
        <p>Details: {details}</p>
        <p>Size: {size}</p>
        <p>Maker: {maker}</p>
        <p>Model: {model}</p>
        <p>Link: {link}</p>
      </span>
      <button
        onClick={() => {
          props.handleDeleteItem(id);
        }}
      >
        D
      </button>
      <button
        onClick={() => {
          props.toggleModalPut(id);
        }}
      >
        C
      </button>
    </div>
  );
}

export default Item;
