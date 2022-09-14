const productItemReducer = (state = "buyBtn", action) => {
  switch (action.type) {
    case "DISABLED":
      return (state = "buyBtn disabled");
    default:
      return state;
  }
};

export default productItemReducer;
