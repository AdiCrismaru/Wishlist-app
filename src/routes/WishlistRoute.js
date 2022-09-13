import React from "react";
import Nav from "../components/Nav";
import { WishlistsProvider } from "../context/WishlistsContext";
import WishlistUI from "../pages/wishlistsPage/WishlistUI";

export default function WishlistRoute() {
  return (
    <div>
      <Nav />
      <WishlistUI />
    </div>
  );
}
