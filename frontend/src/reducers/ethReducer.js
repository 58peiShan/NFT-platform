import * as types from "../actions/types";

const initialState = {
  usd: ''
};
const ethReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ETH_SUCCESS: {
      return {
        ...state,
        usd: action.payload.currentPrice.usd
      };
    }
    default:
      return state;
  }
};

export default ethReducer;
