import React, { useEffect, useState } from "react";
import { getItems } from "../../api/ItemsAxios";
import ReactPaginate from "react-paginate";

export default function WishlistUpdateForm({ id, wishlist, onSubmitHandler }) {
  const [data, setData] = useState({
    name: wishlist.name,
    details: wishlist.details,
    itemIds: wishlist.items.map((item) => item.item.id),
  });

  const [itemData, setItemData] = useState([]);

  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    displayItems();
  }, []);

  const displayItems = (start) => {
    getItems(start).then((res) => {
      setItemData(res.data.items);
      setTotalCount(res.data.totalCount);
      setPageCount(Math.ceil(totalCount / 10));
    });
  };

  let startValue;
  const handlePageClick = (click) => {
    startValue = click.selected * 10;
    displayItems(startValue);
  };

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
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={() => {
            onSubmitHandler(id, data);
          }}
        >
          Update
        </button>
      </form>
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={pageCount ? pageCount : 2}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
}
