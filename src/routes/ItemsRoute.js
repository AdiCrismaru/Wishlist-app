import React, { useState } from "react";
import Nav from "../components/Nav";
import ItemsRequests from "../api/requests/ItemsRequests";
import { ItemsContext } from "../context/ItemsContext";

export default function ItemsRoute() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [size, setSize] = useState("");
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [link, setLink] = useState("");

  const [id, setId] = useState("");

  const [modal, setModal] = useState(false);
  const [modalPut, setModalPut] = useState(false);

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
            modal,
            setModal,
            modalPut,
            setModalPut,
          }}
        >
          <ItemsRequests />
        </ItemsContext.Provider>
      </div>
    </div>
  );
}
