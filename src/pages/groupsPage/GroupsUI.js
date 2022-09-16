import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getGroups, getSharedGroups } from "../../api/GroupsAxios";
import Nav from "../../components/Nav";
import WrapTextContainer from "../../components/WrapTextContainer";
import Groups from "./Groups";
import ModalAddGroup from "./ModalAddGroup";

export default function GroupsUI() {
  const [data, setData] = useState([]);

  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState(0);

  const setGroups = (start) => {
    getGroups(start)
      .then((res) => {
        console.log(res);
        setData(res.data.groups);
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
      <Nav />
      <ModalAddGroup setGroups={setGroups} />
      <WrapTextContainer>{mapGroups}</WrapTextContainer>
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
