import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <img src="https://www.jrtoycanada.ca/images/jrtoyco/showcase/wishlisttextscaled.png"></img>
      <ul className="nav-links">
        <Link to="/wishlist" className="link">
          <li>My Wishlists</li>
        </Link>

        <Link to="/groups" className="link">
          <li>Groups</li>
        </Link>
        <Link to="/profile" className="link">
          <li>Profile</li>
        </Link>
      </ul>
    </nav>
  );
}
