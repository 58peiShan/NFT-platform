import { NavLink } from "react-router-dom";
import React from "react";
import logo from "../img/opensea.png";

function Footer() {
  return (
    <footer className="d-flex">
      <div className="logo">
        {/* <img src={logo} alt="logo" />{" "} */}
      </div>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Explore</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </div>
    </footer>
  );
}

export default Footer;
