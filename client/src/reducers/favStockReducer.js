import {
  GET_FAV_STOCKS,
  UPDATE_FAV_STOCKS,
  FAV_STOCKS_LOADING
} from "../actions/types";

const initialState = {
  favStocks: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FAV_STOCKS:
      return {
        ...state,
        favStocks: action.payload,
        loading: false
      };
    case UPDATE_FAV_STOCKS: {
      return {
        ...state,
        favStocks: action.payload,
        loading: false
      };
    }
    case FAV_STOCKS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
