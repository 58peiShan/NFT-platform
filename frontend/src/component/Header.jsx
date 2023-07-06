import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaSearch,
  FaShoppingCart,
  FaSignOutAlt,
  FaListUl,
} from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import logo from "../img/opensea.png";
import { fetchSearch } from "../actions/cardAction";
import { useState } from "react";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buyThing = useSelector((state) => state.productReducer);
  const auth = localStorage.getItem("auth");
  const [isChecked, setIsChecked] = useState(false);
  const searchRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    searchRef.current.value = "";
    setIsChecked(false)
  }, [pathname]);


  const debounce =(fn,time)=>{
    let timeoutId;
    return wrapper;
    function wrapper (...args){
      if(timeoutId){
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(()=>{
        timeoutId = null
      fn(...args)
      },time)
    }
  }

  const seacherHandler = debounce( e => {
    if (e) {
      console.log(e);
      dispatch({ type: "GET_CARD" });
      dispatch(fetchSearch(e));
    } else {
      dispatch({ type: "NO_SEARCH" });
    }
  },600);
  const logoutHandler = () => {
    const logout = confirm("確定要登出嗎？");
    if (logout) {
      localStorage.clear();
      dispatch({ type: "CARTLIST_RESET" });
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
          <span>CloseSea</span>
        </div>
      </Link>

      <label htmlFor="menu" className="menu">
        <FaListUl />
      </label>
      <input checked={isChecked} type="checkbox" id="menu" onChange={()=>setIsChecked(!isChecked)}/>

      <ul className="links">
        <div className="searchContainer">
          <span>
            <FaSearch className="icon" />
          </span>
          <input
            type="search"
            id="search"
            ref={searchRef}
            onChange={(e) => seacherHandler(e.target.value)}
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
      </ul>
    </header>
  );
}

export default Header;
