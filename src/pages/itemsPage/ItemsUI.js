import WrapTextContainer from "../../components/WrapTextContainer";
import React, { useEffect, useState } from "react";
import { getItems } from "../../api/ItemsAxios";
import { PuffLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import AddItemModal from "./AddItemModal";
import Items from "./Items";

function ItemsUI() {
  const [data, setData] = useState([]);

  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setItemsList();
  }, []);

  const setItemsList = (start) => {
    getItems(start)
      .then((res) => {
        setData(res.data.items);
        setTotalCount(res.data.totalCount);
        setPageCount(Math.ceil(totalCount / 6));
        setLoading(false);
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
    return <Items data={data} object={object} setItemsList={setItemsList} />;
  });

  return (
    <>
      {!loading && <AddItemModal setItemsList={setItemsList} />}

      <div className="d-flex justify-content-center">
        {loading ? (
          <PuffLoader />
        ) : (
          <WrapTextContainer>{mapData}</WrapTextContainer>
        )}
      </div>

      {!loading && (
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
          // activeClassName={"active"}
        />
      )}
    </>
  );
}

export default ItemsUI;
