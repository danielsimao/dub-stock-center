import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import currencyReducer from "./currencyReducer";
import favStockReducer from "./favStockReducer";
import historyReducer from "./historyReducer";

export default combineReducers({
  currency: currencyReducer,
  error: errorReducer,
  auth: authReducer,
  favStock: favStockReducer,
  history: historyReducer
});
