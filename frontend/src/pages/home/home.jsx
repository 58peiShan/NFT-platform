import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import React from "react";
import indexImg from "../../img/immortal.jpg";
import authorImg from "../../img/author_JIMMY.png";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../component/Card.jsx";
import { FaUndo, FaClock } from "react-icons/fa";
import { fetchPrice } from "../../actions/nftAction";
import { useEffect, useState } from "react";

function Home() {
  const dispatch = useDispatch();
  const top10 = useSelector((state) => state.nftReducer.top10);
  const usd = useSelector((state) => state.nftReducer.usd);
  const search = useSelector((state) => state.cardReducer.search);
  const [list, setList] = useState([]);
  const [ethlist, setEthList] = useState({});
  const [reload, setReload] = useState(false);
  const [top10each, setTop10each] = useState([]);
  const override = {
    display: "block",
    margin: "150px auto",
    borderColor: "rgb(49, 150, 218)",
  };
  useEffect(() => {
    fetch(`http://localhost:5000/product/nft/blockdata`)
      .then((res) => res.json())
      .then((data) => setList(data.data.data));
    fetch(`https://api.coingecko.com/api/v3/coins/ethereum`)
      .then((res) => res.json())
      .then((data) => setEthList(data.market_data)),
      dispatch(fetchPrice());
  }, [reload]);

  useEffect(() => {
    if (top10 !== {}) {
      console.log(top10each);
      fetch(
        `http://localhost:5000/product/nft/top10each?add=${JSON.stringify(
          top10
        )}`
      )
        .then((res) => res.json())
        .then((data) => setTop10each(data));
    }
  }, [top10]);
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
            <button type="button" className="btnMain" style={{ margin: "0" }}>
              <Link to="/products">Explore</Link>
            </button>
            <button
              type="button"
              className="btnSec"
              onClick={() => alert("敬請期待!")}
            >
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
            <p
              style={{
                color: "rgb(49, 150, 218)",
              }}
            >
              {usd ? usd : <BeatLoader color="#3196DA" />}
            </p>
          </div>
          <div className="coin">
            <p>24hours</p>
            <p>
              {ethlist !== {} ? (
                ethlist.price_change_percentage_24h
              ) : (
                <BeatLoader />
              )}
            </p>
          </div>
          <div className="coin">
            <p>7days</p>
            <p>
              {ethlist !== {} ? (
                ethlist.price_change_percentage_7d
              ) : (
                <BeatLoader />
              )}
            </p>
          </div>
        </div>
        <div
          className="d-flex"
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <h1>TOP10 NFTs</h1>
        </div>
        <table className="nftTop10">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Collection Name</th>
              <th>Collection Address</th>
              <th>Trans(24h)</th>
              <th>Trans(7d)</th>
            </tr>
          </thead>
          <tbody>
            {top10each.length === 10 ? (
              top10.map((v, i) => {
                const timestamp = new Date(1 * (v.time + "000"));
                const y = timestamp.getFullYear();
                const m = timestamp.getMonth() + 1;
                const d = timestamp.getDate();
                let ind = top10each.findIndex((item) => {
                  return item.tokenHash === v.tokenAddress;
                });

                return (
                  <tr key={i}>
                    <td style={{ width: "100px" }}>
                      <div className="logo d-flex">
                        {top10each[ind].logo ? (
                          <img src={top10each[ind].logo} alt="" />
                        ) : (
                          <div className="d-flex">
                            {top10each[ind].tokenInfo.s}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <a href={top10each[ind] ? top10each[ind].webSite : ""}>
                        {top10each[ind] ? top10each[ind].tokenInfo.f : "none"}
                      </a>
                    </td>
                    <td>
                      <a
                        href={`https://etherscan.io/address/${v.tokenAddress}`}
                      >
                        {v.tokenAddress.slice(0, 4) +
                          "..." +
                          v.tokenAddress.slice(
                            v.tokenAddress.length - 4,
                            v.tokenAddress.length
                          )}
                      </a>
                    </td>
                    <td>{v.volume24hours}</td>
                    <td>{v.volume7days}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} style={{ height: "20vh" }}>
                  <ClipLoader loading={true} cssOverride={override} size={50} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
        <table className="trans">
          <thead>
            <tr>
              <th>Block No</th>
              <th>Collection abbr</th>
              <th>Collection Address</th>
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
                        {v.collectionAddr.slice(0, 4) +
                          "..." +
                          v.collectionAddr.slice(
                            v.collectionAddr.length - 4,
                            v.collectionAddr.length
                          )}
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
                  <ClipLoader loading={true} cssOverride={override} size={50} />
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
