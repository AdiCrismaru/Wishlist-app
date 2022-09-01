import React, { useState, useEffect } from "react";
import "./Wishlist.css";
import axios from "axios";
import ItemList from "./ItemList";
import Modal from "./Modal";

function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setItems(res.data);
    });
  }, []);
  return (
    <div className="wishlist-container">
      <div className="item-list">
        <div className="individual-list">
          <ItemList items={items} start={0} end={6} />
        </div>
        <div className="individual-list">
          <ItemList items={items} start={6} end={10} />
        </div>
        <div className="individual-list">
          <ItemList items={items} start={10} end={18} />
        </div>
      </div>
      <h2>email, password, dob, name, phone</h2>
      <h1>how to store user input in order to post request axios</h1>
      <h2>date of birth also</h2>
      <h1>useState, useEffect</h1>
      <h1>headers, body</h1>
      <Modal />
    </div>
  );
}

export default Wishlist;
