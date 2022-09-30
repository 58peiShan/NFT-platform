import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartlist from "./cartlistReducer";
import cardBtn from "./cardBtnReducer";
import cardReducer from "./cardReducer";


export default combineReducers({
  productReducer,
  cartlist,
  cardBtn,
  cardReducer
});
