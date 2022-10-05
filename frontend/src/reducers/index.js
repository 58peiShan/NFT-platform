import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartlist from "./cartlistReducer";
import cardReducer from "./cardReducer";
import userReducer from "./userReducer";
import nftReducer from "./nftReducer";

export default combineReducers({
  productReducer,
  cartlist,
  cardReducer,
  userReducer,
  nftReducer
});
