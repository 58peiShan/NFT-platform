import * as types from "./types";
export const getPurchaseSuccess = (purchase) => {
  return {
    type: types.GET_PURCHASE_SUCCESS,
    payload: {
      loading: false,
      purchase: purchase,
    },
  };
};

export const getPurchaseError = (error) => {
  return {
    type: types.GET_PURCHASE_FAILED,
    error: error,
  };
};

export const fetchPurchase = () => {
  const id = JSON.parse(localStorage.getItem("purchase"));
  return dispatch => {
    if (!id) return;
    for (let i = 0; i < id.length; i++) {
      fetch(`http://localhost:5000/product/id/${id[i]}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch(getPurchaseSuccess(data));
        })
        .catch((error) => {
          dispatch(getPurchaseError(error));
        });
    }
  };
};
