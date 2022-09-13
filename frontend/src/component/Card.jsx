import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

function Card(props) {
  const [list, setList] = useState([]);
  const category = props.category;
  const sort = useParams()["*"];
  const purchaseList = JSON.parse(localStorage.getItem("purchase")) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (sort) {
      fetch(`http://localhost:5000/product/${sort}`)
        .then((res) => res.json())
        .then((data) => {
          setList(data);
        });
    } else {
      fetch(`http://localhost:5000/product/`)
        .then((res) => res.json())
        .then((data) => {
          setList(data);
        });
    }
  }, [sort]);
  
  const handleBuy = (id) => {
    const purchase = {
      item: id,
    };
    update();
    purchaseList.push(purchase);
    dispatch({ type: "INCREMENT" });
  };
  function update() {
    let purchaseString = JSON.stringify(purchaseList);
    localStorage.setItem("purchase", purchaseString);
  }

  return (
    <>
      {list.map((v, i) => {
        return (
          <div key={i}>
            <div className="card product">
              <div className="imgContainer">
                <img src={`/img/${v.img}`} />
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
              <div
                className="buyBtn"
                onClick={() => {
                  handleBuy(v.id);
                }}
              >
                BUY NOW
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Card;
