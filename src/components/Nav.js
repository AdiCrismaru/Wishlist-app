import { Link } from "react-router-dom";
import React from "react";

export default function Nav() {
  return (
    <nav>
      <img src="https://www.jrtoycanada.ca/images/jrtoyco/showcase/wishlisttextscaled.png"></img>
      <ul className="nav-links">
        <Link to="/items" className="link">
          <li>Items</li>
        </Link>

        <Link to="/wishlist" className="link">
          <li>My Wishlists</li>
        </Link>

        <Link to="/users" className="link">
          <li>Users</li>
        </Link>

        <Link to="/groups" className="link">
          <li>My-Groups</li>
        </Link>
        <Link to="/shared-groups" className="link">
          <li>Shared-Groups</li>
        </Link>
        <Link to="/profile" className="link">
          <li>Profile</li>
        </Link>
        <Link to="/notifications" className="link">
          <li>Notifications</li>
        </Link>
      </ul>
    </nav>
  );
}
