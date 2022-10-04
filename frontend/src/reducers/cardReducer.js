import * as types from '../actions/types'

const initialState = {
  card: [],
  search:false,
  loading:true
};
const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NO_SEARCH: {
      return {
        ...state,
        card:[],
        search:false
      };
    }
    case types.GET_CARD: {
      return {
        ...state,
        search:true
      };
    }
    case types.GET_CARD_SUCCESS: {
      return {
        ...state,
        card: action.payload.card,
        loading:false
      };
    }
    case types.GET_CARD_BYCATE: {
      return {
        ...state,
        card: action.payload.card,
        loading:false
      };
    }
    default:
      return state;
  }
};

export default cardReducer;
