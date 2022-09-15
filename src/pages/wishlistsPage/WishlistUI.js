import React, { useState, useEffect } from "react";
import UpdateList from "./UpdateList";
import { getWishlists } from "../../api/WishlistAxios";
import ModalAddWishlist from "./ModalAddWishlist";
import WrapTextContainer from "../../components/WrapTextContainer";
import ReactPaginate from "react-paginate";

function WishlistUI() {
  const [data, setData] = useState([]);

  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState(0);

  const setWishlist = (start) => {
    getWishlists(start)
      .then((res) => {
        setData(res.data.wishlists.reverse());
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
    setWishlist(startValue);
  };

  useEffect(() => {
    setWishlist();
  }, []);

  const wishlistsMap = data.map((object) => {
    return <UpdateList data={data} object={object} setWishlist={setWishlist} />;
  });

  return (
    <div>
      <ModalAddWishlist setWishlist={setWishlist} />
      <WrapTextContainer>{wishlistsMap}</WrapTextContainer>
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

export default WishlistUI;
