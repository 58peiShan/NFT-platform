import * as types from "./types";
export const getethsuccess = (data) => {
  return {
    type: types.GET_ETH_SUCCESS,
    payload: {
      currentPrice: data,
    },
  };
};

export const fetchPrice = () => {
  return (dispatch) => {
    fetch(`https://api.coingecko.com/api/v3/coins/ethereum`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getethsuccess(data.market_data.current_price))
      })
      .catch((error) => {
        console.log("error");
      });
  };
};
