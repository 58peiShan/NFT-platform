import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../actions/cardAction";
function Card(props) {
  const dispatch = useDispatch();
  const param = useLocation().pathname;
  const sort = useParams()["*"];
  const list = useSelector((state) => state.cardReducer.card);
  const purchaseList = JSON.parse(localStorage.getItem("purchase")) || [];
  const [cardBtn, total] = useSelector((state) => [
    state.cardBtn,
    state.productReducer,
  ]);

  useEffect(() => {
    let paramFit = /^\/products/ 
    if (paramFit.test(param)) {
      dispatch(fetchCategory(sort));
    } else {
      return;
    }
  }, [sort, param]);

  useEffect(() => {
    dispatch({ type: "IS_INCART" });
  }, []);

  const handleBuy = (id) => {
    //if (!localStorage.getItem("auth")) {
    // alert("請先登入！");
    // return;
    //} else
    if (purchaseList.includes(id)) {
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
        list.map((v, i) => (
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
                onClick={() => handleBuy(v.id)}
              >
                BUY NOW
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
