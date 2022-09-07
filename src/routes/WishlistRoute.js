import React, { useState } from "react";
import Nav from "../components/Nav";
import { WishlistsContext } from "../context/WishlistsContext";
import WishlistsRequests from "../api/requests/WishlistsRequests";

export default function WishlistRoute() {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const [itemIds, setItemIds] = useState([]);
  const [id, setId] = useState([]);

  const [modalUpdateItem, setModalUpdateItem] = useState(false);
  const [modalAddItem, setModalAddItem] = useState(false);
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
          modalAddItem,
          setModalAddItem,
          modalUpdateItem,
          setModalUpdateItem,
        }}
      >
        <WishlistsRequests />
      </WishlistsContext.Provider>
    </div>
  );
}
