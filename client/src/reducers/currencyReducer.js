import { GET_CURRENCIES, CURR_LOADING } from "../actions/types";

const initialState = {
  currencies: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
        loading: false
      };
    case CURR_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
