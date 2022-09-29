import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaEthereum } from "react-icons/fa";

function ProductItem(props) {
  const dispatch = useDispatch();
  const id = parseInt(useParams().id);
  const purchaseList = JSON.parse(localStorage.getItem("purchase")) || [];
  const [item, setItem] = useState({});

  const handleBuy = (id, amount) => {
    if (!localStorage.getItem("auth")) {
      alert("請先登入！");
      return;
    } else if (purchaseList.includes(id) || amount === 0) {
      return;
    } else {
      const purchase = id;
      purchaseList.push(1*purchase);
      let purchaseString = JSON.stringify(purchaseList);
      localStorage.setItem("purchase", purchaseString);
      dispatch({ type: "PURCHASE_RESET" });
      dispatch({ type: "INCREASE" });
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/product/id/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(...data));
  }, []);
  return (
    <>
      <div className="divcontainer d-flex">
        <div className="itemImgBox">
          <img src={`../../img/${item.img}`} alt="" />
        </div>
        <div className="itemInfoBox d-flex">
          <div className="d-flex">
            {item.author}
            <FaCheckCircle />
          </div>
          <div>
            <h1>{item.workName}</h1>
            <h4>分類 : {item.category}</h4>
          </div>
          <div className="priceBox">
            <div>
              <h3>銷售狀態：{item.amount > 0 ? "最後機會" : "完售"}</h3>
            </div>
            <div className="">
              <h2>
                Price <FaEthereum /> {item.price}{" "}
              </h2>
            </div>
            <button
              className={purchaseList.includes(id) ||item.amount===0 ? "btnSOLDOUT" : "btnMain"}
              style={{ margin: "30px 0 " }}
              onClick={()=>handleBuy(id, item.amount)}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
