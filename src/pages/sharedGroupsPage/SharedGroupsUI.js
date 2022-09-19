import WrapTextContainer from "../../components/WrapTextContainer";
import { getSharedGroups } from "../../api/SharedGroupsAxios";
import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import ReactPaginate from "react-paginate";
import SharedGroups from "./SharedGroups";

function SharedGroupsUI() {
  const [sharedGroupData, setSharedGroupData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSharedGroups();
  }, []);

  const setSharedGroups = () => {
    getSharedGroups()
      .then((res) => {
        setSharedGroupData(res.data.groups.reverse());
        setTotalCount(res.data.totalCount);
        setPageCount(Math.ceil(totalCount / 3));
        setLoading(false);
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

  const sharedGroupsMap = sharedGroupData.map((group) => {
    return <SharedGroups group={group} data={sharedGroupData} />;
  });

  return (
    <>
      <div className="d-flex justify-content-center">
        {loading ? (
          <PuffLoader />
        ) : (
          <WrapTextContainer>{sharedGroupsMap}</WrapTextContainer>
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

export default SharedGroupsUI;
