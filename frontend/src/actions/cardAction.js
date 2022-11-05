import * as types from "./types";

export const getCardSuccess = (card) => {
  return {
    type: types.GET_CARD_SUCCESS,
    payload: {
      card:card
    },
  };
};
export const getCardByCate = (card) => {
  return {
    type: types.GET_CARD_BYCATE,
    payload: {
      card:card
    },
  };
};

export const fetchCategory = (sort) => {
  return (dispatch) => {
     fetch(`http://localhost:5000/product/${sort}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch(getCardByCate(data));
        })
        .catch((error) => {
          console.log(error);
        });
  };
};
export const fetchSearch = (search) => {
  return (dispatch) => {
     fetch(`http://localhost:5000/product?search=${search}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch(getCardSuccess(data));
        })
        .catch((error) => {
          console.log(error);
          
        });
  };
};
