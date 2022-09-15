import React, { useState, useEffect } from "react";
import { getUsers } from "../../api/UsersAxios";
import ReactPaginate from "react-paginate";
import WrapTextContainer from "../../components/WrapTextContainer";

function UpdateGroupForm({
  id,
  group,
  onSubmitHandler,
  postGroupUsersHandler,
}) {
  const [data, setData] = useState({
    name: group.name,
    details: group.details,
  });

  const [usersData, setUsersData] = useState({ userIds: [] });
  const [usersRequest, setUsersRequest] = useState([]);

  const [usersPageCount, setUsersPageCount] = useState();
  const [usersTotalCount, setUsersTotalCount] = useState(0);

  const displayUsers = (start) => {
    getUsers(start)
      .then((res) => {
        console.log(res);
        setUsersRequest(res.data.users);
        setUsersTotalCount(res.data.totalCount);
        setUsersPageCount(Math.ceil(usersTotalCount / 10));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    displayUsers();
  }, []);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSelectHandler = (e) => {
    const value = parseInt(e.target.value);
    let arrCopy = usersData.userIds;
    if (arrCopy.includes(value)) {
      arrCopy.splice(arrCopy.indexOf(value), 1);
    } else {
      arrCopy.push(value);
    }
    setUsersData({ ...usersData, users: arrCopy });
  };

  let usersStartValue;
  const handlePageClickUsers = (click) => {
    usersStartValue = click.selected * 10;
    displayUsers(usersStartValue);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="user-input">
          <input
            name="name"
            type="text"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Name"
          ></input>
          <input
            name="details"
            type="text"
            value={data.details}
            onChange={onChangeHandler}
            placeholder="Details"
          ></input>
          <WrapTextContainer>
            {usersRequest.map((user) => {
              return (
                <div key={user.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={user.id}
                      checked={usersData.userIds.includes(user.id)}
                      onClick={onSelectHandler}
                    />
                    {user.name}
                  </label>
                </div>
              );
            })}
          </WrapTextContainer>
        </div>
      </form>

      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={usersPageCount ? usersPageCount : 8}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClickUsers}
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
      <input
        type="submit"
        value="Update"
        onClick={() => {
          onSubmitHandler(id, data);
          postGroupUsersHandler(id, usersData);
        }}
      ></input>
    </>
  );
}

export default UpdateGroupForm;
