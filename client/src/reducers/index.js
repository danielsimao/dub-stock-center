import { combineReducers } from "redux";
// import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import currencyReducer from "./currencyReducer";

export default combineReducers({
  // item: itemReducer,
  currency: currencyReducer,
  error: errorReducer,
  auth: authReducer
});
