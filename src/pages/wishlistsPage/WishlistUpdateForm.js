import React, { useEffect, useState } from "react";
import { getItems } from "../../api/ItemsAxios";

export default function WishlistUpdateForm({ id, wishlist, onSubmitHandler }) {
  const [data, setData] = useState({
    name: wishlist.name,
    details: wishlist.details,
    itemIds: wishlist.items.map((item) => item.id),
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

  const onSelectHandler = (e) => {
    const value = parseInt(e.target.value);
    let listCopy = data.itemIds;
    if (listCopy.includes(value)) {
      listCopy.splice(listCopy.indexOf(value), 1);
    } else {
      listCopy.push(value);
    }
    setData({ ...data, itemIds: listCopy });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler(id, data);
      }}
    >
      <input
        name="name"
        value={data.name}
        onChange={onChangeHandler}
        type="text"
        placeholder="Wishlist name"
        autoComplete="off"
      ></input>
      <input
        name="details"
        value={data.details}
        onChange={onChangeHandler}
        type="text"
        placeholder="Details"
      ></input>
      {itemData.map((item) => {
        return (
          <div key={item.id}>
            <label>
              <input
                type="checkbox"
                value={item.id}
                checked={data.itemIds.includes(item.id)}
                onClick={onSelectHandler}
              />
              {item.name}
            </label>
          </div>
        );
      })}

      <button type="submit" className="btn btn-secondary">
        Update
      </button>
    </form>
  );
}
