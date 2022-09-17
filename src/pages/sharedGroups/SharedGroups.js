import React from "react";

export default function SharedGroups({ data }) {
  const sharedGroupsMap = data.map((group) => {
    return (
      <div key={group.Group.id} className="col-sm-6 col-md-4 v my-2">
        <div
          className="card shadow-sm w-100"
          style={{ minHeight: 300, maxWidth: 300 }}
        >
          <div className="card-body">
            <h4 className="card-title text-center ">{group.Group.name}</h4>
            <h5 className="card-subtitle mb-2  text-muted text-center">
              {group.Group.details}
            </h5>
            <div>
              <h5 className="card-subtitle mb-2 text-center">Users:</h5>
              {group.users.map((user) => {
                return (
                  <div key={user.id}>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      {user.name}
                    </h6>
                  </div>
                );
              })}
            </div>
            <div>
              <h4 className="card-subtitle mb-2 text-center">Wishlists:</h4>
              {group.wishlists.map((wishlist) => {
                return (
                  <div key={wishlist.id}>
                    <h5 className="card-subtitle mb-2  text-center">
                      {wishlist.name}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      {wishlist.details}
                    </h6>
                    {wishlist.items.map((item) => {
                      return (
                        <ul key={item.id}>
                          <li className="card-subtitle mb-2 text-muted text-center">
                            {item.name}
                          </li>
                          <p className="card-subtitle mb-2 text-muted text-center">
                            {item.details}
                          </p>
                          {/* <li className="card-subtitle mb-2 text-muted text-center">
                            {item.size}
                          </li> */}
                          <p className="card-subtitle mb-2 text-muted text-center">
                            {item.maker}
                          </p>
                          {/* <li className="card-subtitle mb-2 text-muted text-center">
                            {item.model}
                          </li> */}
                          {/* <li className="card-subtitle mb-2 text-muted text-center">
                            {item.link}
                          </li> */}
                        </ul>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  });
  return sharedGroupsMap;
}
