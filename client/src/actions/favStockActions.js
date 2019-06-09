import axios from "axios";
import {
  GET_FAV_STOCKS,
  ADD_FAV_STOCK,
  DELETE_FAV_STOCK,
  FAV_STOCKS_LOADING,
  AUTH_ERROR
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getFavStock = () => (getState, dispatch) => {
  dispatch(setFavoriteStocks());
  axios
    .get("/api/user/favorites", tokenConfig(getState))
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
//Decide between update or add/delete
export const addFavStock = item => (dispatch, getState) => {
  axios
    .post("/api/user/favorites", item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_FAV_STOCK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteFavStock = id => (dispatch, getState) => {
  axios
    .delete(`/api/user/favorites/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_FAV_STOCK,
        payload: id
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
