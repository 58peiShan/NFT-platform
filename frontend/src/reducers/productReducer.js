const purchaseList = JSON.parse(localStorage.getItem("purchase"));

const productReducer = (
  state = purchaseList ? purchaseList.length : 0,
  action
) => {
  switch (action.type) {
    case "CARTLIST_RESET":
      return (state = 0);
    case "INCREASE":
      return (state = state += 1);
    case "DECREASE":
      return (state = state -= 1);
    default:
      return state;
  }
};

export default productReducer;
