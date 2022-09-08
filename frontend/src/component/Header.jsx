import { NavLink } from "react-router-dom";
import React from "react";
import logo from "../img/opensea.png";

function Header() {
  return (
    <header className="d-flex">
      <div className="logo"><img src={logo} alt="logo" /> CloseSea</div>
      <div className="links">
        <input type="text"></input>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Explore</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </div>
    </header>
  );
}

export default Header;
