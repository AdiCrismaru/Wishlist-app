import React, { useEffect, useState } from "react";
import { getItems } from "../../api/ItemsAxios";

export default function WishlistAddForm({ postWishlistHandler }) {
  const [itemIds, setItemIds] = useState([]);
  const [data, setData] = useState({
    wishlist: {
      name: "",
      details: "",
    },
    itemIds,
  });

  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    getItems().then((res) => {
      setItemData(res.data.items);
    });
  }, []);

  const onChangeHandler = (e) => {
    const [section, key] = e.target.name.split(".");
    if (key) {
      setData({
        ...data,
        [section]: { ...data[section], [key]: e.target.value },
      });
    } else {
      setData({ ...data, [section]: e.target.value });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        postWishlistHandler(data);
      }}
    >
      <input
        name="wishlist.name"
        onChange={onChangeHandler}
        type="text"
        placeholder="Wishlist name"
        autoComplete="off"
      ></input>
      <input
        name="wishlist.details"
        onChange={onChangeHandler}
        type="text"
        placeholder="Details"
      ></input>
      <select name="itemIds" id="dropdown" required multiple>
        {itemData.map((item) => {
          return (
            <option
              key={item.id}
              value={item.id}
              selected="true"
              onClick={(e) => {
                setData({ ...data, itemIds: itemIds });
                setItemIds([...itemIds, parseInt(e.target.value)]);
              }}
            >
              {item.name}
            </option>
          );
        })}
      </select>

      <input type="submit" value="Add" />
    </form>
  );
}
