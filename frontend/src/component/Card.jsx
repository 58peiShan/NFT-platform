import React, { useEffect, useState } from "react";
import  { useLocation, useParams } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import productImg from "../img/Spaceface.jpg";


function Card(props) {
  const [list, setList] = useState([]);
  const category = props.category;
  const sort = useParams()['*']
  // console.log(sort);

  useEffect(() => {
    fetch(`http://localhost:5000/product/${sort}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
  }, [sort]);

  return (
    <>
      <h1>{category}</h1>
      {list.map((v, i) => {
        return (
          <div key={i}>
            <div className="card product">
              <div className="imgContainer">
                <img src={`localhost:3000/src/img/immortal.jpg`}/>
              </div>
              <div className="container ">
                <h3>{v.workName}</h3>
                <div className="price">
                  <p>price</p>
                  <div className="d-flex">
                    <FaEthereum />
                    <h3>{v.price}</h3>
                  </div>
                </div>
              </div>
              <div className="buyBtn">BUY NOW</div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Card;
