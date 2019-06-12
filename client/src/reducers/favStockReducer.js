import {
  GET_FAV_STOCKS,
  ADD_FAV_STOCKS,
  DELETE_FAV_STOCKS,
  FAV_STOCKS_LOADING,
  ADD_FAV_STOCKS_FAIL
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
    case DELETE_FAV_STOCKS: {
      return {
        ...state,
        favStocks: state.favStocks.filter(
          favStock => favStock._id !== action.payload
        )
      };
    }
    case ADD_FAV_STOCKS: {
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
    case ADD_FAV_STOCKS_FAIL:
    default:
      return state;
  }
}
