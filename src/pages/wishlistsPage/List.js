import React from "react";
import { useWishlistsUpdate } from "../../context/WishlistsContext";

function List(props) {
  const { id, name, details, items } = props.wishlist;
  const { DELETEhandler, toggleModalUpdateItem } = useWishlistsUpdate();
  return (
    <div className="items">
      <span key={id}>
        <p>N:{name}</p>
        <p>D:{details}</p>

        {items.map((item) => (
          <p key={item.id}>Item: {item.name}</p>
        ))}
      </span>
      <button
        onClick={() => {
          DELETEhandler(id);
        }}
      >
        D
      </button>
      <button
        onClick={() => {
          toggleModalUpdateItem(id);
        }}
      >
        C
      </button>
    </div>
  );
}

export default List;
