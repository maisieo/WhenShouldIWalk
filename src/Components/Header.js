import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <Link to="/" exact>
            Home
          </Link>
        </li>
        <li>
          <Link to="/mywalks">My walks</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
