import React, { useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";

import { FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../actions/cardAction";

function Card(props) {
  const dispatch = useDispatch();
  const param = useLocation().pathname;
  const sort = useParams()["*"];
  const purchaseList = JSON.parse(localStorage.getItem("purchase")) || [];
  const {
    cardReducer: { card: list },
  } = useSelector((state) => state);

  useEffect(() => {
    /^\/products/.test(param) && dispatch(fetchCategory(sort));
  }, [sort, param]);

  const handleBuy = (id, amount) => {
    if (!localStorage.getItem("auth")) {
      alert("請先登入！");
      return;
    } else if (purchaseList.includes(id) || amount === 0) {
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
                  <Link to={`/products/item/${v.id}`}>
                    <img src={`/img/${v.img}`} />
                  </Link>
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
                    purchaseList.includes(v.id) || v.amount === 0
                      ? "buyBtn disabled"
                      : "buyBtn"
                  }
                  onClick={() => handleBuy(v.id, v.amount)}
                >
                  {v.amount === 0 ? "SOLD OUT" : "BUY NOW"}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="divcontainer">暫無資料</div>
      )}
    </>
  );
}

export default Card;
