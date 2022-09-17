import React, { useEffect, useState } from "react";
import UpdateItem from "./UpdateItem";
import "./Items.css";
import { getItems } from "../../api/ItemsAxios";
import ModalAddItem from "./ModalAddItem";
import ReactPaginate from "react-paginate";
import WrapTextContainer from "../../components/WrapTextContainer";

function ItemsUI() {
  const [data, setData] = useState([]);

  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setItemsList();
  }, []);

  const setItemsList = (start) => {
    getItems(start)
      .then((res) => {
        setData(res.data.items);
        setTotalCount(res.data.totalCount);
        setPageCount(Math.ceil(totalCount / 6));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let startValue;
  const handlePageClick = (click) => {
    startValue = click.selected * 6;
    setItemsList(startValue);
  };

  const mapData = data.map((object) => {
    return (
      <UpdateItem data={data} object={object} setItemsList={setItemsList} />
    );
  });

  return (
    <div className="wishlist-container">
      <ModalAddItem setItemsList={setItemsList} />
      <WrapTextContainer>{mapData}</WrapTextContainer>

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
    </div>
  );
}

export default ItemsUI;
