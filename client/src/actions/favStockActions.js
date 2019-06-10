import axios from "axios";
import {
  GET_FAV_STOCKS,
  UPDATE_FAV_STOCKS,
  FAV_STOCKS_LOADING,
  AUTH_ERROR
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getFavStock = () => (dispatch, getState) => {
  dispatch(setFavoriteStocks());
  axios
    .get("/api/users/favorites", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_FAV_STOCKS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const updateFavStock = favStock => (dispatch, getState) => {
  axios
    .post("/api/users/favorites", favStock, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_FAV_STOCKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setFavoriteStocks = () => {
  return {
    type: FAV_STOCKS_LOADING
  };
};
