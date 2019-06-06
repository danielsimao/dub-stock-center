import axios from "axios";
import { GET_CURRENCIES, CURR_LOADING } from "./types";
import { returnErrors } from "./errorActions";

export const getCurrencies = () => dispatch => {
  dispatch(setCurrenciesLoading());
  axios
    .get("/api/currency/symbols")
    .then(res =>
      dispatch({
        type: GET_CURRENCIES,
        payload: res.data.symbols
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setCurrenciesLoading = () => {
  return {
    type: CURR_LOADING
  };
};
