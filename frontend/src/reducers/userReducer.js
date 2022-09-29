import * as types from "../actions/types";

const initialState = {
  collectionId: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_COLLECTION_RESET": {
      return {
        ...state,
        collectionId: [],
      };
    }
    case types.GET_USER_COLLECTION_OK: {
      return {
        ...state,
        collectionId: [...action.payload.collection, ...state.collectionId],
      };
    }
    case types.GET_USER_COLLECTION_FAIL: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
