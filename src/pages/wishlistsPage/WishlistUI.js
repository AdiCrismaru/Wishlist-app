import WrapTextContainer from "../../components/WrapTextContainer";
import { getWishlists } from "../../api/WishlistAxios";
import PuffLoader from "react-spinners/PuffLoader";
import React, { useState, useEffect } from "react";
import AddWishlistModal from "./AddWishlistModal";
import ReactPaginate from "react-paginate";
import Wishlists from "./Wishlists";

function WishlistUI() {
  const [data, setData] = useState([]);

  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWishlist();
  }, []);

  const setWishlist = (start) => {
    getWishlists(start)
      .then((res) => {
        setData(res.data.wishlists);
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
    setWishlist(startValue);
  };

  const wishlistsMap = data.map((object) => {
    return <Wishlists data={data} object={object} setWishlist={setWishlist} />;
  });

  return (
    <>
      {!loading && <AddWishlistModal setWishlist={setWishlist} />}

      <div className="d-flex justify-content-center">
        {loading ? (
          <PuffLoader />
        ) : (
          <WrapTextContainer>{wishlistsMap}</WrapTextContainer>
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

export default WishlistUI;
