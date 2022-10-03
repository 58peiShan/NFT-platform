import { Routes, Route, Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ClipLoader";
import React from "react";
import indexImg from "../../img/immortal.jpg";
import authorImg from "../../img/author_JIMMY.png";
import { useSelector } from "react-redux";
import Card from "../../component/Card.jsx";
import { FaUndo, FaClock } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";

function Home() {
  const search = useSelector((state) => state.cardReducer.search);
  const [list, setList] = useState([]);
  const [ethlist, setEthList] = useState({});
  const [currentPrice, setCurreunPrice] = useState({});
  const [reload, setReload] = useState(false);
  const override = {
    display: "block",
    margin: "150px auto",
    borderColor: "rgb(49, 150, 218)",
  };
  useEffect(() => {
    fetch(`http://localhost:5000/product/nft/blockdata`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setList(data.data.data));
    fetch(`https://api.coingecko.com/api/v3/coins/ethereum`)
      .then((res) => res.json())
      .then(
        (data) => setEthList(data.market_data),
        (data) => setCurreunPrice(data.market_data.current_price)
      );
    fetch(`https://api.coingecko.com/api/v3/coins/ethereum`)
      .then((res) => res.json())
      .then((data) => setCurreunPrice(data.market_data.current_price));
  }, [reload]);
  return search ? (
    <div className="divcontainer">
      <div className="productList d-flex">
        <Card />
      </div>
    </div>
  ) : (
    <div className="homeWrapper">
      <div className="bg" style={{ backgroundImage: `url(${indexImg})` }}></div>
      <div className="divcontainer d-flex">
        <div className="text d-flex">
          <h1>Discover, collect, and sell extraordinary NFTs</h1>
          <p>OpenSea is the world's first and largest NFT marketplace</p>
          <div className="d-flex">
            <button className="btnMain" style={{ margin: "0" }}>
              <Link to="/products">Explore</Link>
            </button>
            <button className="btnSec" onClick={() => alert("敬請期待!")}>
              Create
            </button>
          </div>
        </div>
        <div className="img d-flex">
          <div
            className="card"
            style={{
              width: "500px",
              height: "400px",
              justifyContent: "space-between",
            }}
          >
            <div className="imgContainer">
              <img src={indexImg} alt="" />
            </div>
            <div className="cardInfo d-flex">
              <div>
                <img src={authorImg} alt="authorImg" />
              </div>
              <div>
                <p>IMMOPTAL BABBLE</p>
                <p>JIMMYYY</p>
              </div>
              <div>[??????]</div>
            </div>
          </div>
        </div>
      </div>
      <div className="divcontainer status">
        <div className="coinBox">
          <div className="coin">
            <p>Ethereum</p>
          </div>
          <div className="coin">
            <p>USD</p>
            <p>{currentPrice.usd}</p>
          </div>
          <div className="coin">
            <p>24hours</p>
            <p
              style={{
                color:
                  parseFloat(ethlist.price_change_percentage_7d) >= 0
                    ? "red"
                    : "green",
              }}
            >
              {ethlist ? (
                ethlist.price_change_percentage_24h
              ) : (
                <ScaleLoader loading={true} cssOverride={override} size={20} />
              )}
            </p>
          </div>
          <div className="coin">
            <p>7days</p>
            <p
              style={{
                color:
                  parseFloat(ethlist.price_change_percentage_7d) >= 0
                    ? "red"
                    : "green",
              }}
            >
              {ethlist ? (
                ethlist.price_change_percentage_7d
              ) : (
                <ScaleLoader loading={true} cssOverride={override} size={20} />
              )}
            </p>
          </div>
        </div>
        <div
          className="d-flex"
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <h1>Recent transactions</h1>
          <div
            style={{ cursor: "pointer", height: "50px" }}
            onClick={() => {
              setList([]), setReload(!reload);
            }}
          >
            <FaUndo className="reload" />
          </div>
        </div>

        <table className="">
          <thead>
            <tr>
              <th>block No</th>
              <th>collection</th>
              <th>collection address</th>
              <th>
                <FaClock />
              </th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((v, i) => {
                const timestamp = new Date(1 * (v.time + "000"));
                const y = timestamp.getFullYear();
                const m = timestamp.getMonth() + 1;
                const d = timestamp.getDate();

                return (
                  <tr key={i}>
                    <td>{v.blockNo}</td>
                    <td style={{ color: "rgb(49, 150, 218)" }}>
                      {v.collectionSymbol ? v.collectionSymbol : "none"}
                    </td>
                    <td>
                      <a
                        href={`https://etherscan.io/address/${v.collectionAddr}`}
                      >
                        {v.collectionAddr}
                      </a>
                    </td>
                    <td>{`${y}-${m}-${d} ${timestamp
                      .toTimeString()
                      .substring(0, 8)}`}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} style={{ height: "20vh" }}>
                  <ScaleLoader
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
  );
}

export default Home;
