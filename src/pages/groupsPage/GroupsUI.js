import WrapTextContainer from "../../components/WrapTextContainer";
import React, { useEffect, useState } from "react";
import { getGroups } from "../../api/GroupsAxios";
import AddGroupModal from "./AddGroupModal";
import { PuffLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import Groups from "./Groups";

export default function GroupsUI() {
  const [data, setData] = useState([]);

  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const setGroups = (start) => {
    getGroups(start)
      .then((res) => {
        setData(res.data.groups);
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
    setGroups(startValue);
  };

  useEffect(() => {
    setGroups();
  }, []);

  const mapGroups = data.map((group) => {
    return <Groups data={data} group={group} setGroups={setGroups} />;
  });

  return (
    <>
      {!loading && <AddGroupModal setGroups={setGroups} />}

      <div className="d-flex justify-content-center">
        {loading ? (
          <PuffLoader />
        ) : (
          <WrapTextContainer>{mapGroups}</WrapTextContainer>
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
