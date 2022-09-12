import { Routes, Route, NavLink, useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Card from "../../component/Card.jsx";
import banner from "../../img/product-banner.png";

function Product() {
  const [bannerlight, setBannerlight] = useState(1);

  return (
    <>
      <div className="banner">
        <img
          src={banner}
          alt=""
          style={{
            opacity: bannerlight,
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
          <Routes>
            <Route path="/image" element={<Card category="image" />} />
            <Route path="/gifs" element={<Card category="gifs" />} />
            <Route path="/video" element={<Card category="video" />} />
            <Route path="/music" element={<Card category="music"/>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Product;
