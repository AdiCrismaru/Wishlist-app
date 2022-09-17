import React, { useEffect, useState } from "react";
import { getSharedGroups } from "../../api/SharedGroupsAxios";
import Nav from "../../components/Nav";
import SharedGroups from "./SharedGroups";
import WrapTextContainer from "../../components/WrapTextContainer";
import ReactPaginate from "react-paginate";

function SharedGroupsUI() {
  const [sharedGroupData, setSharedGroupData] = useState([]);

  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState(0);

  const setSharedGroups = () => {
    getSharedGroups()
      .then((res) => {
        setSharedGroupData(res.data.groups.reverse());
        setTotalCount(res.data.totalCount);
        setPageCount(Math.ceil(totalCount / 3));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let startValue;
  const handlePageClick = (click) => {
    startValue = click.selected * 3;
    setSharedGroups(startValue);
  };

  useEffect(() => {
    setSharedGroups();
  }, []);
  return (
    <>
      <Nav />
      <WrapTextContainer>
        <SharedGroups data={sharedGroupData} />
      </WrapTextContainer>
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

export default SharedGroupsUI;
