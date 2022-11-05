import * as types from "./types";
export const getethsuccess = (data) => {
  return {
    type: types.GET_ETH_SUCCESS,
    payload: {
      currentPrice: data,
    },
  };
};
export const gettop10success = (data) => {
  return {
    type: types.GET_TOP10_SUCCESS,
    payload: {
      top10: data,
    },
  };
};

export const fetchPrice = () => {
  return (dispatch) => {
    fetch(`https://api.coingecko.com/api/v3/coins/ethereum`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getethsuccess(data.market_data.current_price));
      })
      .catch((error) => {
        console.log("error");
      });
  };
};
export const fetchNftTop10 = () => {
  return (dispatch) => {
    fetch(`http://localhost:5000/product/nft/top10`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(gettop10success(data.data));
      })
      .catch((err) => console.log(err));
  };
};
