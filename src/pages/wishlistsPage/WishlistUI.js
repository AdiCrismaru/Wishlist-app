import React, { useContext } from "react";
import { WishlistsContext } from "../../context/WishlistsContext";
import WishlistModal from "../../components/WishlistModal";
import IdMapModal from "../../components/IdMapModal";

function WishlistUI({
  toggleModalAddItem,
  POSThandler,
  wishlistsMap,
  toggleModalUpdateItem,
  PUThandler,
}) {
  const { id, modalAddItem, modalUpdateItem } = useContext(WishlistsContext);
  return (
    <div>
      <div>
        <button onClick={toggleModalAddItem} className="btn-modal">
          Add new
        </button>
        {modalAddItem && (
          <IdMapModal toggle={toggleModalAddItem} handle={POSThandler} />
        )}

        {wishlistsMap}

        {modalUpdateItem && (
          <WishlistModal
            toggle={toggleModalUpdateItem}
            handle={() => {
              PUThandler(id);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default WishlistUI;
