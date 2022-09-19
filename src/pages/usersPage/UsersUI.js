import WrapTextContainer from "../../components/WrapTextContainer";
import { getUsers, searchUsers } from "../../api/UsersAxios";
import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import SearchUserForm from "./SearchUserForm";
import ReactPaginate from "react-paginate";
import User from "./User";

function UsersUI() {
  const [data, setData] = useState([]);

  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsersList();
  }, []);

  const setUsersList = (start) => {
    getUsers(start)
      .then((res) => {
        setData(res.data.users);
        setLoading(false);
        setTotalCount(res.data.totalCount);
        setPageCount(Math.ceil(totalCount / 9));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setFilteredList = (value) => {
    searchUsers(value)
      .then((res) => {
        setData(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let startValue;
  const handlePageClick = (data) => {
    startValue = data.selected * 9;
    setUsersList(startValue);
  };

  const mapUsers = data.map((object) => {
    return <User object={object} data={data} />;
  });

  return (
    <>
      {!loading && <SearchUserForm setFilteredList={setFilteredList} />}

      <div className="d-flex justify-content-center">
        {loading ? (
          <PuffLoader />
        ) : (
          <WrapTextContainer>{mapUsers}</WrapTextContainer>
        )}
      </div>

      {!loading && (
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={pageCount ? pageCount : 9}
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
      )}
    </>
  );
}

export default UsersUI;
