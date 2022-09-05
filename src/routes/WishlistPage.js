import React from "react";
import Items from "../api/requests/wishlist/Items";
import Nav from "../components/Nav";

export default function WishlistPage() {
  return (
    <div>
      <Nav />
      <div className="wishlist-container">
        <Items />
      </div>
    </div>
  );
}
