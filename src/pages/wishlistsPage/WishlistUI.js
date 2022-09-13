import React, { useState, useEffect } from "react";
import UpdateList from "./UpdateList";
import { getWishlists } from "../../api/WishlistAxios";
import ModalAddWishlist from "./ModalAddWishlist";

function WishlistUI() {
  const [data, setData] = useState([]);

  const setWishlist = () => {
    getWishlists()
      .then((res) => {
        setData(res.data.wishlists);
        // console.log(res.data.wishlists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setWishlist();
  }, []);

  const wishlistsMap = data.map((object) => {
    return <UpdateList data={data} object={object} setWishlist={setWishlist} />;
  });
  return (
    <div>
      <ModalAddWishlist setWishlist={setWishlist} />

      {wishlistsMap}
    </div>
  );
}

export default WishlistUI;
