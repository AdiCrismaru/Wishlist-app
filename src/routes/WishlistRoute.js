import React, { useState } from "react";
import Nav from "../components/Nav";
import WishlistUI from "../pages/wishlistsPage/WishlistUI";
import { WishlistsContext } from "../context/WishlistsContext";

export default function WishlistRoute() {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const [itemIds, setItemIds] = useState([0]);
  const [id, setId] = useState([]);
  return (
    <div>
      <Nav />
      <WishlistsContext.Provider
        value={{
          data,
          setData,
          name,
          setName,
          details,
          setDetails,
          itemIds,
          setItemIds,
          id,
          setId,
        }}
      >
        <WishlistUI />
      </WishlistsContext.Provider>
    </div>
  );
}
