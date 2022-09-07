import { NavLink } from "react-router-dom";
import React from "react";
import logo from "../img/opensea.png";

function Header() {
  return (
    <header>
      <div className="logo"><img src={logo} alt="Your SVG" /> logo</div>
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
