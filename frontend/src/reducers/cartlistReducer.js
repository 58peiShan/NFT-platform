import * as types from "../actions/types";

const initialState = {
  purchase: [],
};

const cartlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PURCHASE_RESET: {
      return {
        ...state,
        purchase:[]
      };
    }
    case types.GET_PURCHASE_REQUEST: {
      return {
        ...state,
      };
    }
    case types.GET_PURCHASE_SUCCESS: {
      return {
        ...state,
        purchase: [...action.payload.purchase, ...state.purchase]
      };
    }
    case types.GET_PURCHASE_FAILED: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    default:
      return state;
  }
};

export default cartlistReducer;
