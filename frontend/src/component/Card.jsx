import React from "react";
import productImg from "../img/Spaceface.jpg";

function Card() {
  return (
    <>
      <div className="card">
        <div className="imgContainer">
          <img src={productImg} alt="Avatar" />
        </div>
        <div className="container">
          <h4>NAME</h4>
          <p>price</p>
          <h1>4.3</h1>
        </div>
          <div className="buyBtn">BUY NOW</div>
      </div>
    </>
  );
}

export default Card;
