import React from "react";
import { Link } from "react-router-dom";
// import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    //Header code
    <div className="nav">
      <input type="checkbox" id="nav-check"></input>
      <div className="nav-header">
        <div className="nav-title">When Should I Walk?</div>
      </div>
      <div class="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      {/* This is where I have incorporated React Router into the header */}
      <div class="nav-links">
        <Link to="/" exact>
          Home
        </Link>
        <Link to="/mywalks" exact>
          My Walks
        </Link>
      </div>
    </div>
  );
}
export default Header;
