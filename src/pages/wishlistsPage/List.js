import React from "react";
import {
  useWishlists,
  useWishlistsUpdate,
} from "../../context/WishlistsContext";

function List(props) {
  const { id, name, details, items } = props.wishlist;
  const { DELETEhandler, toggleModalUpdateItem, dltItem } =
    useWishlistsUpdate();
  const { itemIds } = useWishlists;
  return (
    <div className="items">
      <span key={id}>
        <p>N:{name}</p>
        <p>D:{details}</p>

        {items.map((item) => (
          <div>
            <p key={item.id}>Item: {item.name}</p>
          </div>
        ))}
      </span>
      <div className="buttons">
        <button
          className="btn"
          onClick={() => {
            DELETEhandler(id);
          }}
        >
          Del
        </button>
        <button
          className="btn"
          onClick={() => {
            toggleModalUpdateItem(id);
          }}
        >
          Upd
        </button>
      </div>
    </div>
  );
}

export default List;
