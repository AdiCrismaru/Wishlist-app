import React, { useState } from "react";
import Items from "../api/requests/wishlist/Items";
import Wishlists from "../api/requests/wishlist/Wishlists";
import Nav from "../components/Nav";
import { ItemsContext } from "../context/ItemsContext";

export default function WishlistPage() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [size, setSize] = useState("");
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [link, setLink] = useState("");

  const [id, setId] = useState("");

  const [data, setData] = useState([]);
  return (
    <div>
      <Nav />
      <div className="wishlist-container">
        <ItemsContext.Provider
          value={{
            name,
            setName,
            details,
            setDetails,
            size,
            setSize,
            maker,
            setMaker,
            model,
            setModel,
            link,
            setLink,
            id,
            setId,
            data,
            setData,
          }}
        >
          <Items />
        </ItemsContext.Provider>
      </div>
    </div>
  );
}
