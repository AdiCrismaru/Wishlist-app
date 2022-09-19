import React, { useEffect, useState } from "react";
import { getWishlists } from "../../api/WishlistAxios";

function AddBuyersForm({ handleBuy, group }) {
  const [wishlistData, setWishlistData] = useState([]);
  const [gift, setGift] = useState({
    buyersIds: wishlistData.map((wishlist) =>
      wishlist.items.map((item) => item.item.buyers.map((buyer) => buyer.id))
    ),
  });

  useEffect(() => {
    listWishlist();
  }, []);

  const listWishlist = () => {
    getWishlists()
      .then((res) => {
        setWishlistData(res.data.wishlists);
      })
      .catch((err) => console.log(err));
  };
  console.log(group);
  return (
    <form>
      <button
        className="btn btn-secondary"
        onClick={() => {
          //   handleBuy(group.Group.id, item.id, gift.buyersIds);
        }}
      >
        Add
      </button>
    </form>
  );
}

export default AddBuyersForm;
