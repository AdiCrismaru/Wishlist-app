import React from "react";

export default function SharedGroups({ data }) {
  const sharedGroupsMap = data.map((group) => {
    return (
      <div className="shared-groups-holder">
        <div className="shared-groups">
          <ul>
            <li>Name:{group.Group.name}</li>
            <li>Details:{group.Group.details}</li>
            <li>Owner ID: {group.Group.ownerId}</li>
            <div>
              <span>Users:</span>
              {group.users.map((user) => {
                return (
                  <ul>
                    <li>{user.name}</li>
                  </ul>
                );
              })}
            </div>
            <div>
              <span>Wishlist:</span>
              {group.wishlists.map((wishlist) => {
                return (
                  <ul>
                    <li>Name:{wishlist.name}</li>
                    <li>Details:{wishlist.details}</li>
                    {wishlist.items.map((item) => {
                      return (
                        <ul>
                          <li> {item.name}</li>
                          <li> {item.details}</li>
                          <li> {item.size}</li>
                          <li> {item.maker}</li>
                          <li> {item.model}</li>
                          <li> {item.link}</li>
                        </ul>
                      );
                    })}
                  </ul>
                );
              })}
            </div>
          </ul>
        </div>
      </div>
    );
  });
  return sharedGroupsMap;
}
