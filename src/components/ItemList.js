import React, { useState } from "react";

function ItemList({ items, start, end }) {
  return (
    <ul>
      {items.slice(start, end).map((item) => (
        <li>
          {item.title}
          <input className="map-input" type="checkbox"></input>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
