import { Routes, Route, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Card from "../../component/Card.jsx";
import banner from "../../img/product-banner.png";

function Product() {
  const [bannerlight, setBannerlight] = useState(1);
  // let match = useMatch();
  // console.log(match);

  useEffect(() => {
    var lastScrollTop = 0;
    const handleScroll = () => {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setBannerlight(1);
      } else {
        setBannerlight(0.5);
      }
      lastScrollTop = scrollTop;
      console.log("789");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <NavLink to="products/image">Image</NavLink>
          </li>
          <li>
            <NavLink to="products/gifs">GIFs</NavLink>
          </li>
          <li>
            <NavLink to="products/video">Video</NavLink>
          </li>
          <li>
            <NavLink to="products/music">Music</NavLink>
          </li>
        </ul>

        <Routes>
          <Route path="/products/image" element={<Card category="image" />} />
          <Route path="/products/gifs" element={<Card category="gifs" />} />
          <Route path="/products/video" element={<Card category="video" />} />
          <Route path="/products/music" element={<Card category="music" />} />
        </Routes>
      </div>
    </>
  );
}

export default Product;
