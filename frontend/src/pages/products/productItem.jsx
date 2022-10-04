import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaEthereum, FaEye } from "react-icons/fa";
import { fetchPrice } from "../../actions/ethAction";

function ProductItem() {
  const usd = useSelector((state) => state.ethReducer.usd);
  const dispatch = useDispatch();
  const id = parseInt(useParams().id);
  const purchaseList = JSON.parse(localStorage.getItem("purchase")) || [];
  const [item, setItem] = useState({});

  const handleBuy = (id, amount) => {
    if (!localStorage.getItem("auth")) {
      alert("請先登入！");
    } else if (purchaseList.includes(id) || amount === 0) {
    } else {
      const purchase = id;
      purchaseList.push(1 * purchase);
      let purchaseString = JSON.stringify(purchaseList);
      localStorage.setItem("purchase", purchaseString);
      dispatch({ type: "PURCHASE_RESET" });
      dispatch({ type: "INCREASE" });
    }
  };
  useEffect(() => {
    fetch(`http://localhost:5000/product/id/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(...data)),
      dispatch(fetchPrice())
  }, []);
  return (
    <div className="divcontainer d-flex">
      <div className="socialMedia"></div>
      <div className="itemImgBox">
        <img src={`../../img/${item.img}`} alt="" />
      </div>
      <div className="itemInfoBox d-flex">
        <div className="d-flex" style={{justifyContent:"space-between"}}>
          <div className="d-flex">
            {item.author}
            <FaCheckCircle />
          </div>
          {/* <div className="d-flex"  style={{color:"gray",fontSize:"16px"}}>
            <FaEye/>
            {everSeen}檢視次數
          </div> */}
        </div>
        <div>
          <h1>{item.workName}</h1>
          <h4>分類 : {item.category}</h4>
        </div>
        <div className="priceBox">
          <div>
            <h3>銷售狀態：{item.amount > 0 ? "最後機會" : "完售"}</h3>
          </div>
          <div
            className="d-flex"
            style={{ justifyContent: "start", alignItems: "baseline" }}
          >
            <h2>
              <FaEthereum /> {item.price}
            </h2>
            <span style={{ color: "gray", marginLeft: "10px" }}>
              ${Math.round((item.price * usd + Number.EPSILON) * 100) / 100}
            </span>
          </div>
          <button
            type="button"
            className={
              purchaseList.includes(id) || item.amount === 0
                ? "btnSOLDOUT"
                : "btnMain"
            }
            style={{ margin: "30px 0 " }}
            onClick={() => handleBuy(id, item.amount)}
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
