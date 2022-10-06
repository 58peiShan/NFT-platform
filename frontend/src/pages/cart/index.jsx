import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ScaleLoader from "react-spinners/ClipLoader";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "rgb(49, 150, 218)",
};

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");
  const purchaseList = JSON.parse(localStorage.getItem("purchase"));
  const {
    cartlist: { purchase: list },
    nftReducer: { usd: usd },
    productReducer: total,
  } = useSelector((state) => state);
  const eachPrice = [];
  list.every((o) => eachPrice.push(o.price));
  const initialValue = 0;
  const ethlPrice =
    total > 0
      ? eachPrice.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          initialValue
        )
      : 0;
  const totalPrice = Math.round(ethlPrice * usd);

  const handleDel = (id) => {
    dispatch({ type: "PURCHASE_RESET" });
    dispatch({ type: "DECREASE" });
    const i = purchaseList.findIndex((element) => element == id);
    if (i === 0) {
      let remove = purchaseList.splice(0, 1);
    } else {
      let remove = purchaseList.splice(i, i);
    }
    localStorage.setItem("purchase", JSON.stringify(purchaseList));
  };
  const outputList = list.map((v, i) => {
    return (
      <tr key={i}>
        <td style={{width:"150px"}}>
          <img src={`/img/${v.img}`} alt="" />
        </td>
        <td>{v.workName}</td>
        <td>{v.price}</td>
        <td>{v.amount}</td>
        <td>{v.price * v.amount}</td>
        <td onClick={(e) => handleDel(v.id)}>
          <FaTrash />
        </td>
      </tr>
    );
  });

  return token ? (
    <>
      <div className="divcontainer">
        <table>
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th>數量</th>
              <th>小計</th>
              <th>X</th>
            </tr>
          </thead>
          <tbody>
            {total < 1 ? (
              <tr>
                <td colSpan={6}>nodata</td>
              </tr>
            ) : (
              outputList
            )}
          </tbody>
        </table>
        <hr />

        <div className="total">
          <p className="m-5" style={{ color: "gray", fontSize: "16px" }}>
            ETH to USD
          </p>
          <div className="m-5">total：{totalPrice}</div>
          {totalPrice ? (
            <>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AdSZktCJPTSq1FiiwmaBvbI2zYy1gyamYwlv9ikcsEoa3cVGuA-4QiTlpzCcs2nX2rGxNDBhze3Fe4UE",
                }}
              >
                <PayPalButtons
                  style={{ color: "blue" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: `${totalPrice}`,
                          },
                        },
                      ],
                    });
                  }}
                  //交易成功
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      const name = details.payer.name.given_name;
                      fetch(`http://localhost:5000/user/addpurchase`, {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          purchase: localStorage.getItem("purchase"),
                        }),
                      })
                        .then((res) => res.text())
                        .then(
                          (data) => localStorage.setItem("auth", data),
                          dispatch({ type: "CARTLIST_RESET" }),
                          dispatch({ type: "PURCHASE_RESET" }),
                          localStorage.removeItem("purchase"),
                          alert(`交易成功， ${name}`)
                        );
                    });
                  }}
                />
              </PayPalScriptProvider>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  ) : (
    <div className="divcontainer">
      <div className="container d-flex" style={{ justifyContent: "center" }}>
        <h1>請先登入！</h1>
      </div>
      <ScaleLoader loading={true} cssOverride={override} size={50} />

      <div style={{ color: "white" }}>
        {setTimeout(() => {
          navigate("/user/login");
        }, 1000)}
      </div>
    </div>
  );
}

export default Cart;
