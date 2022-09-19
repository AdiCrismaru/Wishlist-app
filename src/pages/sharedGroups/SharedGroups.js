import React, { useEffect, useState } from "react";
import { getWishlists } from "../../api/WishlistAxios";
import ModalWrapper from "../../components/ModalWrapper";
import AddBuyersForm from "./AddBuyersForm";

export default function SharedGroups({ data, group, handleBuy }) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div key={group.Group.id} className="col-sm-6 col-md-4 v my-2">
      <div
        className="card shadow-sm w-100"
        style={{ minHeight: 300, maxWidth: 300 }}
      >
        <div className="card-body">
          <h4 className="card-title text-center ">{group.Group.name}</h4>
          <h5 className="card-subtitle mb-2  text-muted text-center">
            {group.Group.details}
          </h5>
          <div>
            <h5 className="card-subtitle mb-2 text-center">Users:</h5>
            {group.users.map((user) => {
              return (
                <div key={user.id}>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {user.name}
                  </h6>
                </div>
              );
            })}
          </div>
          <div>
            <h4 className="card-subtitle mb-2 text-center">Wishlists:</h4>
            {group.wishlists.map((wishlist) => {
              return (
                <div key={wishlist.id}>
                  <h5 className="card-subtitle mb-2  text-center">
                    {wishlist.name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {wishlist.details}
                  </h6>
                  {wishlist.items.map((item) => {
                    return (
                      <ul key={item.id}>
                        <li className="card-subtitle mb-2 text-muted text-center">
                          {item.name}
                          <a
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              toggleModal();
                            }}
                          >
                            Buy
                          </a>
                        </li>
                        <p className="card-subtitle mb-2 text-muted text-center">
                          {item.details}
                        </p>
                        <p className="card-subtitle mb-2 text-muted text-center">
                          {item.maker}
                        </p>
                      </ul>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {modal && (
        <div className="z-index">
          <ModalWrapper close={toggleModal}>
            <AddBuyersForm handleBuy={handleBuy} />
          </ModalWrapper>
        </div>
      )}
    </div>
  );
}
