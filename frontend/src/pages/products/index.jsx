import { Routes, Route, NavLink } from "react-router-dom";
import React,{useEffect} from "react";
import Card from "../../component/Card.jsx";
import banner from "../../img/product-banner.png";

function Product() {
  return (
    <>
      <div className="banner">
        <img
          src={banner}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="divcontainer">
        <h1>Explore collections</h1>
        <ul>
          <li>
            <NavLink to="image">Image</NavLink>
          </li>
          <li>
            <NavLink to="gifs">GIFs</NavLink>
          </li>
          <li>
            <NavLink to="video">Video</NavLink>
          </li>
          <li>
            <NavLink to="music">Music</NavLink>
          </li>
        </ul>
        <div className="productList">
          <Card />
        </div>
      </div>
    </>
  );
}

export default Product;
