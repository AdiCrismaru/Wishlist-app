import { isDate } from "moment";
import React, { useState, useEffect } from "react";
import axios from "../../axios";

const token = localStorage.getItem("token");

function Wishlists() {
  const [data, setData] = useState({});

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const [itemIds, setItemIds] = useState([0]);
  const [id, setId] = useState([]);

  const getData = async () => {
    const response = await axios.get("/wishlists", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setData(response);
    console.log(data);
  };

  useEffect(() => {
    getData().catch((err) => {
      console.log(err);
    });
  }, []);
  const createListHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "/wishlists",
        {
          wishlist: {
            name,
            details,
          },
          itemIds,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });

    // setItemIds(itemIds.push(id));
  };
  return (
    <div>
      <form onSubmit={createListHandler}>
        <input
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Wishlist name"
          autoComplete="off"
        ></input>
        <input
          name="details"
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          type="text"
          placeholder="Details"
          autoComplete="off"
        ></input>
        <input
          name="ids"
          onChange={(e) => {
            setId(parseInt(e.target.value));
          }}
          type="text"
          placeholder="ID"
          autoComplete="off"
        ></input>
      </form>
      <h1>Need to specify the items array</h1>
      <button onClick={createListHandler}>Create</button>
    </div>
  );
}

export default Wishlists;
