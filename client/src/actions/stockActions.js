import axios from "axios";
import { UPDATE_FAV_STOCK, AUTH_ERROR } from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const updateFavStock = () => (getState, dispatch) => {
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_FAV_STOCK,
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
