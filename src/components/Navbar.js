import React from "react";
import { Link } from "gatsby";

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          К·Р·А·П·И·В·А
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
