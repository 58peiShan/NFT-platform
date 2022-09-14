const purchaseList = JSON.parse(localStorage.getItem("purchase"));

const productReducer = (
  state = purchaseList ? purchaseList.length : 0,
  action
) => {
  switch (action.type) {
    case "CHANGE":
      return (state = state += 1);
    default:
      return state;
  }
};

export default productReducer;
