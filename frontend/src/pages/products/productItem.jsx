import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCheckCircle,
  FaEthereum,
  FaAngleDown,
  FaAngleUp,
  FaExchangeAlt,
} from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchPrice } from "../../actions/nftAction";

function ProductItem() {
  const usd = useSelector((state) => state.nftReducer.usd);
  const dispatch = useDispatch();
  const id = parseInt(useParams().id);
  const purchaseList = JSON.parse(localStorage.getItem("purchase")) || [];
  const [item, setItem] = useState({});
  const [detail, setDetail] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const override = {
    display: "block",
    margin: "150px auto",
    borderColor: "rgb(49, 150, 218)",
  };
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
      dispatch(fetchPrice());
  }, []);

  const getDetail = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetch(
        `http://localhost:5000/product/detail?add=${item.collection_address}`
      )
        .then((res) => res.json())
        .then((data) => data.type?setDetail({'錯誤':'查無資料'}):setDetail(data.data));
    }
  };
  return (
    <div className="divcontainer d-flex flex-column">
      <div className="d-flex sm-column">
        <div className="itemImgBox">
          <img src={`../../img/${item.img}`} alt="" />
        </div>
        <div className="itemInfoBox d-flex">
          <div className="d-flex" style={{ justifyContent: "flex-start" }}>
              <img className="authorImg" src={`../../img/${item.authorImg}`} alt="" />
            <div className="d-flex">
              <h3>
                {item.author}
                <FaCheckCircle style={{ fontSize: "18px" }} />
              </h3>
            </div>
          </div>
          <div>
            <h1>{item.workName}</h1>
            <h4>分類 : {item.category}</h4>
          </div>
          <div className="priceBox">
            <div className="d-flex">
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

      <div
        className="detialBox d-flex flex-column"
        onClick={getDetail}
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <input
          checked={isOpen}
          type="checkbox"
          name="open"
          onChange={() => setIsOpen(!isOpen)}
        />
        <div
          className="d-flex"
          style={{
            marginBottom: "30px",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="open">
            <FaExchangeAlt />
            <h2>Collection Activity</h2>
          </label>
          <span>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        </div>
        <div className="detialContent">
          <table>
            <thead>
              <tr>
                <th>Collection</th>
                <th>Id</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {detail.length > 0 ? (
                detail.map((v, i) => {
                  const timestamp = new Date(1 * (v.time + "000"));
                  const y = timestamp.getFullYear();
                  const m = timestamp.getMonth() + 1;
                  const d = timestamp.getDate();
                  return (
                    <tr key={i}>
                      <td>{v.tokenInfo.f}</td>
                      <td>{v.nftId}</td>
                      <td>
                        {v.from.slice(0, 4) +
                          "..." +
                          v.from.slice(v.from.length - 4, v.from.length)}
                      </td>
                      <td>
                        {v.to.slice(0, 4) +
                          "..." +
                          v.to.slice(v.to.length - 4, v.to.length)}
                      </td>
                      <td>{`${y}-${m}-${d} ${timestamp
                        .toTimeString()
                        .substring(0, 8)}`}</td>
                    </tr>
                  );
                })
              ) : (
                detail !=={}?
                <tr>
              <td colSpan={5}>查無資料</td>
              </tr>:
                <tr>
                  <td colSpan={5}>
                    <ClipLoader
                      loading={true}
                      cssOverride={override}
                      size={50}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
