import React, { useContext } from "react";
import { WishlistsContext } from "../../context/WishlistsContext";
import WishlistModal from "../../components/WishlistModal";

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
          <WishlistModal toggle={toggleModalAddItem} handler={POSThandler} />
        )}

        {wishlistsMap}

        {modalUpdateItem && (
          <WishlistModal
            toggle={toggleModalUpdateItem}
            handler={() => {
              PUThandler(id);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default WishlistUI;
