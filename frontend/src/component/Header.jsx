import { NavLink } from "react-router-dom";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import React from "react";
import logo from "../img/opensea.png";

function Header() {
  return (
    <header className="d-flex">
      <div className="logo">
        <img src={logo} alt="logo" /> CloseSea
      </div>
      <div className="links">
        <div className="searchContainer">
          <span>
            <FaSearch className="icon" />
          </span>
          <input type="search" id="search"></input>
        </div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Explore</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/user">
          <FaUserCircle />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
