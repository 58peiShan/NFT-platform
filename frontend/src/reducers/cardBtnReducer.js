const cardBtnReducer = (state = 'buyBtn', action) => {
  switch (action.type) {
    case "IS_INCART":
      return state = 'buyBtn disabled';
    case "REMOVE_FROM_CART":
      return state = 'buyBtn';
    default:
      return state;
  }
};

export default cardBtnReducer;
