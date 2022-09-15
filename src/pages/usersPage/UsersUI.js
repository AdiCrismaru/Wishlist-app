import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Nav from "../../components/Nav";
import User from "./User";
import { getUsers } from "../../api/UsersAxios";
import WrapTextContainer from "../../components/WrapTextContainer";

function UsersUI() {
  const [data, setData] = useState([]);

  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState(0);

  const setUsersList = (start) => {
    getUsers(start)
      .then((res) => {
        setData(res.data.users);
        setTotalCount(res.data.totalCount);
        setPageCount(Math.ceil(totalCount / 9));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let startValue;
  const handlePageClick = (data) => {
    startValue = data.selected * 10;
    setUsersList(startValue);
  };

  useEffect(() => {
    setUsersList();
  }, []);

  const mapUsers = data.map((object) => {
    return <User object={object} data={data} />;
  });
  return (
    <>
      <Nav />
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={pageCount ? pageCount : 8}
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
      <WrapTextContainer>{mapUsers}</WrapTextContainer>
    </>
  );
}

export default UsersUI;
