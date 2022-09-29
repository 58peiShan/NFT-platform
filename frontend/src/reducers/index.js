import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartlist from "./cartlistReducer";
import cardReducer from "./cardReducer";
import userReducer from "./userReducer";


export default combineReducers({
  productReducer,
  cartlist,
  cardReducer,userReducer
});
