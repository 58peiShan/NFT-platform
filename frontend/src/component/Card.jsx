import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../actions/cardAction";
function Card(props) {
  const list = useSelector((state) => state.cardReducer.card);
  const sort = useParams()["*"];
  const purchaseList = JSON.parse(localStorage.getItem("purchase")) || [];
  const cardBtn = useSelector((state) => state.cardBtn);
  const total = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "IS_INCART" });
  }, []);

  useEffect(() => {
    dispatch(fetchCategory(sort));
  }, [sort]);

  const handleBuy = (id) => {
    if (!localStorage.getItem("auth")) {
     alert("請先登入！");
     return;
    } else if (purchaseList.includes(id)) {
      return;
   } else {
      const purchase = id;
      purchaseList.push(purchase);
      let purchaseString = JSON.stringify(purchaseList);
      localStorage.setItem("purchase", purchaseString);
      dispatch({ type: "PURCHASE_RESET" });
      dispatch({ type: "INCREASE" });
    }
  };
  return (
    <>
      {list.length > 0 ? (
        list.map((v, i) => {
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
        })
      ) : (
        <div className="divcontainer">暫無資料</div>
      )}
    </>
  );
}

export default Card;
