import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import indexImg from "../../img/immortal.jpg";
import authorImg from "../../img/author_JIMMY.png";
import Footer from "../../component/Footer.jsx";
import { useSelector } from "react-redux";
import Card from "../../component/Card.jsx";

function Home() {
  const search = useSelector((state) => state.cardReducer.search);
  return search ? (
    <div className="divcontainer">
      <div className="productList d-flex">
        <Card />
      </div>
    </div>
  ) : (
    <div className="">
      <div className="bg" style={{ backgroundImage: `url(${indexImg})` }}></div>
      <div className="divcontainer d-grid">
        <div className="text d-flex">
          <h1>Discover, collect, and sell extraordinary NFTs</h1>
          <p>OpenSea is the world's first and largest NFT marketplace</p>
          <div>
            <button className="btnMain">
              <Link to="/products">Explore</Link>
            </button>
            <button className="btnSec">Create</button>
          </div>
        </div>
        <div className="img d-flex">
          <div
            className="card"
            style={{
              width: "500px",
              height: "400px",
              justifyContent: "space-between",
            }}
          >
            <div className="imgContainer">
              <img src={indexImg} alt="" />
            </div>
            <div className="cardInfo d-flex">
              <div>
                <img src={authorImg} alt="authorImg" />
              </div>
              <div>
                <p>IMMOPTAL BABBLE</p>
                <p>JIMMYYY</p>
              </div>
              <div>[??????]</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
