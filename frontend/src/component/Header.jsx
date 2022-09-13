import { NavLink, useLocation, useParams } from "react-router-dom";
import { FaUserCircle, FaSearch, FaShoppingCart } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../img/opensea.png";

function Header() {
  const sort = useParams()["*"];

  const buyThing = useSelector((state) => state);

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
        <NavLink to="/cart">
          <FaShoppingCart />
        </NavLink>
        {(buyThing > 0 )? <div className="buyAmount">{buyThing}</div> : <></>}

        <NavLink to="/user">
          <FaUserCircle />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
