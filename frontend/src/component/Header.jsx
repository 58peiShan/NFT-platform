import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { FaUserCircle, FaSearch, FaShoppingCart } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../img/opensea.png";

function Header() {
  const buyThing = useSelector((state) => state.productReducer);
  const handleLogin = () => {
    localStorage.setItem("id", 5);
  };
  return (
    <header className="d-flex">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="logo" />
          CloseSea
        </div>
      </Link>
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
        {buyThing > 0 ? <div className="buyAmount">{buyThing}</div> : <></>}
        <NavLink to="/user/login">
          <FaUserCircle />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
