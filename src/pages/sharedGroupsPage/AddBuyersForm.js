import React, { useState } from "react";

function AddBuyersForm({ wishlistId, itemId, handleBuy, group, wishlistData }) {
  const [gift, setGift] = useState({
    // buyersIds: wishlistData.map((wishlist) =>
    //   wishlist.items.map((item) => item.item.buyers.map((buyer) => buyer.id))
    // ),
    buyersIds: [],
  });

  const onSelectHandler = (e) => {
    const value = parseInt(e.target.value);
    let listCopy = gift.buyersIds;
    listCopy.push(value);
    setGift({ ...gift, buyersIds: listCopy });
    console.log(gift);
  };

  const mapGroup = group.users.map((user) => {
    return (
      <div key={user.id}>
        <label>
          <input
            type="checkbox"
            value={user.id}
            checked={gift.buyersIds.includes(user.id)}
            onClick={onSelectHandler}
          />
          {user.name}
        </label>
      </div>
    );
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h3>Who bought this gift?</h3>

      {mapGroup}
      <button
        className="btn btn-secondary"
        onClick={() => {
          console.log(wishlistId, itemId, gift.buyersIds);
          handleBuy(wishlistId, itemId, gift.buyersIds);
        }}
      >
        Buy
      </button>
    </form>
  );
}

export default AddBuyersForm;
