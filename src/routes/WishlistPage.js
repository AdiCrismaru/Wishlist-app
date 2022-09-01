import React from "react";
import Modal from "../components/Modal";
import Nav from "../components/Nav";
import Wishlist from "../components/Wishlist";

export default function WishlistPage() {
  return (
    <div>
      <Nav />
      <div className="wishlist-container">
        <Wishlist />
      </div>
    </div>
  );
}
