import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand to="/" exact>
          When should I walk?
        </Navbar.Brand>
        <Link to="/" exact>
          Home
        </Link>
        <Link to="/mywalks">My walks</Link>
      </Navbar>
    </div>
  );
}

export default Header;
