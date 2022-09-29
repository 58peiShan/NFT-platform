import * as types from "./types";
export const getUserCollectionOK = (data) => {
  return {
    type: types.GET_USER_COLLECTION_OK,
    payload: {
      loading: false,
      collection: data,
    },
  };
};

export const getUserCollectionFail = (error) => {
  return {
    type: types.GET_USER_COLLECTION_FAIL,
  
  };
};

export const fetchUserCollection = (userdata) => {
  const id = JSON.parse(userdata)
  return (dispatch, state) => {
    if (!id) return;
    for (let i = 0; i < id.length; i++) {
      fetch(`http://localhost:5000/product/id/${id[i]}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch(getUserCollectionOK(data));
        })
        .catch((error) => {
          console.log('error');
        });
    }
  };
};
