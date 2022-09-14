import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function Card(props) {
  const [list, setList] = useState([]);
  const sort = useParams()["*"];
  const purchaseList = JSON.parse(localStorage.getItem("purchase")) || [];
  const cardBtn = useSelector((state) => state.cardBtn);
  const total = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch({ type: "IS_INCART" });
  },[total])

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
    if (purchaseList.includes(id)) {
      return;
    } else {
      const purchase = id;
      purchaseList.push(purchase);
      let purchaseString = JSON.stringify(purchaseList);
      localStorage.setItem("purchase", purchaseString);
      dispatch({ type: "CHANGE" });
    }
  };
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
                className={
                  purchaseList.includes(v.id) ? `${cardBtn}` : "buyBtn"
                }
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
