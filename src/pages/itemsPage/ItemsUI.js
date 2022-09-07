import React, { useContext } from "react";
import { ItemsContext } from "../../context/ItemsContext";
import ItemModal from "../../components/ItemModal";
import "./Items.css";

function ItemsUI({
  handleAddItem,
  toggleModal,
  mapData,
  handleUpdateItem,
  toggleModalPut,
}) {
  const { id, modal, modalPut } = useContext(ItemsContext);

  return (
    <div className="wishlist-container">
      <button onClick={toggleModal} className="btn-modal">
        Add new
      </button>
      {modal && <ItemModal handle={handleAddItem} toggle={toggleModal} />}

      {mapData}

      {modalPut && (
        <ItemModal
          handle={() => {
            handleUpdateItem(id);
          }}
          toggle={toggleModalPut}
        />
      )}
    </div>
  );
}

export default ItemsUI;
