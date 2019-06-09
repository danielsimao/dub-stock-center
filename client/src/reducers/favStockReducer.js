import {
  GET_FAV_STOCKS,
  ADD_FAV_STOCK,
  DELETE_FAV_STOCK,
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
        favStocks: state.favStocks.splice(action.payload, 1),
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
