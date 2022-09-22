import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaSearch,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import logo from "../img/opensea.png";
import { fetchSearch } from "../actions/cardAction";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buyThing = useSelector((state) => state.productReducer);
  const auth = localStorage.getItem("auth");
  const seacherHandler = (e) => {
    if (e) {
      dispatch({ type: "GET_CARD" });
      dispatch(fetchSearch(e));
    } else {
      dispatch({ type: "NO_SEARCH" });
    }
  };
  const logoutHandler = () => {
    const logout = confirm("確定要登出嗎？");
    if (logout) {
      localStorage.removeItem("auth");
      localStorage.removeItem("purchase");
      navigate("/");
    } else {
      return;
    }
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
          <input
            type="search"
            id="search"
            onChange={(e) => {
              seacherHandler(e.target.value);
            }}
          ></input>
        </div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Explore</NavLink>
        <NavLink to="/cart">
          <FaShoppingCart />
        </NavLink>
        {buyThing > 0 ? <div className="buyAmount">{buyThing}</div> : <></>}

        {auth ? (
          <>
            <NavLink to="/user/dashboard">
              <FaUserCircle style={{ color: "black" }} />
            </NavLink>
            <a>
              <FaSignOutAlt onClick={logoutHandler} />
            </a>
          </>
        ) : (
          <NavLink to="/user/login">
            <FaUserCircle />
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
