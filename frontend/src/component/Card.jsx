import React from "react";
import productImg from "../img/Spaceface.jpg";

function Card(props) {
  const category =  props.category
  return (
    <>
       <h1>{category}</h1>
      <div className="card product">
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
