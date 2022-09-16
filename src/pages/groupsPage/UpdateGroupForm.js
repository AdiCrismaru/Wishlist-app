import React, { useState, useEffect } from "react";
import { getUsers } from "../../api/UsersAxios";
import ReactPaginate from "react-paginate";
import WrapTextContainer from "../../components/WrapTextContainer";
import { getWishlists } from "../../api/WishlistAxios";

function UpdateGroupForm({
  id,
  group,
  onSubmitHandler,
  postGroupUsersHandler,
  postGroupWishlistsHandler,
}) {
  const [data, setData] = useState({
    name: group.name,
    details: group.details,
  });

  const [usersData, setUsersData] = useState({
    users: group.users.map((user) => user.id),
  });
  const [usersRequest, setUsersRequest] = useState([]);

  const [usersPageCount, setUsersPageCount] = useState();
  const [usersTotalCount, setUsersTotalCount] = useState(0);

  const [wishlistsData, setWishlistsData] = useState({
    wishlists: group.wishlists.map((list) => list.id),
  });
  const [wishlistsRequest, setWishlistsRequest] = useState([]);

  const [wishlistsPageCount, setWishlistsPageCount] = useState();
  const [wishlistsTotalCount, setWishlistsTotalCount] = useState(0);

  const displayUsers = (start) => {
    getUsers(start)
      .then((res) => {
        setUsersRequest(res.data.users);
        setUsersTotalCount(res.data.totalCount);
        setUsersPageCount(Math.ceil(usersTotalCount / 10));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayWishlists = (start) => {
    getWishlists(start).then((res) => {
      setWishlistsRequest(res.data.wishlists);
      setWishlistsTotalCount(res.data.totalCount);
      setWishlistsPageCount(Math.ceil(wishlistsTotalCount / 6));
    });
  };

  useEffect(() => {
    displayUsers();
    displayWishlists();
  }, []);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSelectHandlerUser = (e) => {
    const value = parseInt(e.target.value);
    let arrCopy = usersData.users;
    if (arrCopy.includes(value)) {
      arrCopy.splice(arrCopy.indexOf(value), 1);
    } else {
      arrCopy.push(value);
    }
    setUsersData({ ...usersData, users: arrCopy });
  };

  const onSelectHandlerWishlist = (e) => {
    const value = parseInt(e.target.value);
    let arrCopy = wishlistsData.wishlists;
    if (arrCopy.includes(value)) {
      arrCopy.splice(arrCopy.indexOf(value), 1);
    } else {
      arrCopy.push(value);
    }
    setWishlistsData({ ...wishlistsData, wishlists: arrCopy });
  };

  let usersStartValue;
  const handlePageClickUsers = (click) => {
    usersStartValue = click.selected * 10;
    displayUsers(usersStartValue);
  };

  let wishlistsStartValue;
  const handlePageClickWishlists = (click) => {
    wishlistsStartValue = click.selected * 6;
    displayWishlists(wishlistsStartValue);
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
          <h5>Add users to group:</h5>
          <div className="items">
            <WrapTextContainer>
              {usersRequest.map((user) => {
                return (
                  <div key={user.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={user.id}
                        checked={usersData.users.includes(user.id)}
                        onClick={onSelectHandlerUser}
                      />
                      {user.name}
                    </label>
                  </div>
                );
              })}
            </WrapTextContainer>
          </div>
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
          <h5>Add wishlists to group:</h5>
          <div className="items">
            <WrapTextContainer>
              {wishlistsRequest.map((wishlist) => {
                return (
                  <div key={wishlist.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={wishlist.id}
                        hecked={wishlistsData.wishlists.includes(wishlist.id)}
                        onClick={onSelectHandlerWishlist}
                      />
                      {wishlist.name}
                    </label>
                  </div>
                );
              })}
            </WrapTextContainer>
          </div>
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            pageCount={wishlistsPageCount ? wishlistsPageCount : 2}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={handlePageClickWishlists}
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

        <button
          className="btn btn-secondary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmitHandler(id, data);
            postGroupUsersHandler(id, usersData);
            postGroupWishlistsHandler(id, wishlistsData);
          }}
        >
          Update
        </button>
      </form>
    </>
  );
}

export default UpdateGroupForm;
