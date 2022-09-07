import React, { useState, useEffect, useContext } from "react";
import axios from "../axios";
import { WishlistsContext } from "../../context/WishlistsContext";

export default function WishlistsRequests() {
  const token = localStorage.getItem("token");

  const {
    data,
    setData,
    name,
    setName,
    details,
    setDetails,
    itemIds,
    setItemIds,
    id,
    setId,
  } = useContext(WishlistsContext);

  const [modalChangeItem, setModalChangeItem] = useState(false);
  const [modalAddItem, setModalAddItem] = useState(false);

  const getData = async () => {
    const response = await axios.get("/wishlists", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.wishlists);
    console.log(data);
  };

  useEffect(() => {
    getData().catch((err) => {
      console.log(err);
    });
  }, []);

  const POSThandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "/wishlists",
        {
          wishlist: {
            name,
            details,
          },
          itemIds,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PUThandler = (id) => {
    axios
      .put(
        `/wishlists/${id}`,
        { wishlist: { name, details }, itemIds },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.status === 200) {
          getData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModalChangeItem = (id) => {
    setModalChangeItem(!modalChangeItem);
    setId(id);
  };
  const toggleModalAddItem = () => {
    setModalAddItem(!modalAddItem);
  };

  const DELETEhandler = (id) => {
    axios
      .delete(`/wishlists/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const wishlistsMap = data.map(({ id, name, details, items }) => {
    return (
      <div key={id} className="items">
        <span>
          <p>{name}</p>
          <p>{details}</p>
          <p>{items}</p>
        </span>
        <button
          onClick={() => {
            DELETEhandler(id);
          }}
        >
          D
        </button>
        <button
          onClick={() => {
            toggleModalChangeItem(id);
          }}
        >
          C
        </button>
      </div>
    );
  });
  return (
    <div>
      <button onClick={toggleModalAddItem} className="btn-modal">
        Add new
      </button>
      {modalAddItem && (
        <div className="modall">
          <div onClick={toggleModalAddItem} className="overlay"></div>
          <div className="modal-content">
            <input
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Item name"
              autoComplete="off"
            ></input>
            <div className="user-input">
              <form onSubmit={POSThandler}>
                <input
                  name="details"
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                  type="text"
                  placeholder="Details"
                ></input>
                <input
                  name="IDs"
                  onChange={(e) => {
                    setItemIds(e.target.value);
                  }}
                  type="text"
                  placeholder="IDs"
                ></input>
              </form>
            </div>
            <div className="btns-div">
              <button onClick={toggleModalAddItem}>Close</button>
              <button onClick={POSThandler}>Save</button>
            </div>
          </div>
        </div>
      )}
      {wishlistsMap}
      {modalChangeItem && (
        <div className="modall">
          <div onClick={toggleModalChangeItem} className="overlay"></div>
          <div className="modal-content">
            <form
              onSubmit={() => {
                PUThandler(id);
              }}
            >
              <input
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Change name"
                autoComplete="off"
              ></input>
              <div className="user-input">
                <input
                  name="details"
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                  type="text"
                  placeholder="Details"
                ></input>
                <input
                  name="IDs"
                  onChange={(e) => {
                    setItemIds(e.target.value);
                  }}
                  type="text"
                  placeholder="IDs"
                ></input>
              </div>
            </form>
            <div className="btns-div">
              <button onClick={toggleModalChangeItem}>Close</button>
              <button
                onClick={() => {
                  PUThandler(id);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
