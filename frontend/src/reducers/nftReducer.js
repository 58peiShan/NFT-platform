import * as types from "../actions/types";

const initialState = {
  usd: '',
  top10:{}
};
const nftReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ETH_SUCCESS: {
      return {
        ...state,
        usd: action.payload.currentPrice.usd
      };
    }
    case types.GET_TOP10_SUCCESS: {
      return {
        ...state,
        top10: action.payload.top10
      };
    }
    default:
      return state;
  }
};

export default nftReducer;
