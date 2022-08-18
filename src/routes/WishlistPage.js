import React from "react";
import Nav from "../components/Nav";
import Wishlist from "../components/Wishlist";

export default function WishlistPage() {
  return (
    <div>
      <Nav />
      <h1>My wishlists</h1>
      <h1>Create wishlist</h1>
      <Wishlist />
    </div>
  );
}
