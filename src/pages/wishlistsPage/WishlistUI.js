import React from "react";
import {
  useWishlists,
  useWishlistsUpdate,
} from "../../context/WishlistsContext";
import WishlistForm from "../../components/WishlistModal";
import IdMapModal from "../../components/IdMapModal";
import List from "./List";
import ModalWrapper from "../../components/ModalWrapper";
import WishlistModal from "../../components/WishlistModal";

function WishlistUI() {
  const { data, id, modalAddItem, modalUpdateItem } = useWishlists();
  const { POSThandler, PUThandler, toggleModalAddItem, toggleModalUpdateItem } =
    useWishlistsUpdate();

  const wishlistsMap = data.map((wishlist) => {
    return <List wishlist={wishlist} />;
  });
  return (
    <div>
      <div>
        <button onClick={toggleModalAddItem} className="btn-modal">
          Add new
        </button>
        {modalAddItem && (
          <IdMapModal toggle={toggleModalAddItem} handle={POSThandler} />
          // <ModalWrapper toggle={toggleModalAddItem} handle={POSThandler}>
          //   <WishlistForm handle={POSThandler} />
          // </ModalWrapper>
        )}

        {wishlistsMap}

        {modalUpdateItem && (
          <WishlistModal
            toggle={toggleModalUpdateItem}
            handle={() => {
              PUThandler(id);
            }}
          />
          // <ModalWrapper toggle={toggleModalUpdateItem} handle={PUThandler}>
          //   <WishlistForm
          //     handle={() => {
          //       PUThandler(id);
          //     }}
          //   />
          // </ModalWrapper>
        )}
      </div>
    </div>
  );
}

export default WishlistUI;
