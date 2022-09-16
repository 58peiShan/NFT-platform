import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartlist from "./cartlistReducer";
import cardBtn from "./cardBtnReducer";
import signUp from "./userSignupMsgReducer";


export default combineReducers({
  productReducer,
  cartlist,
  cardBtn,
  signUp,
});
