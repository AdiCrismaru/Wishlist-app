import React, { useState } from "react";
import ItemsRequests from "../api/requests/ItemsRequests";
import Nav from "../components/Nav";
import { ItemsContext } from "../context/ItemsContext";

export default function ItemsRoute() {
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
          <ItemsRequests />
        </ItemsContext.Provider>
      </div>
    </div>
  );
}
