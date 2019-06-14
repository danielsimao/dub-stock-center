import axios from "axios";
import {
  GET_HISTORY,
  HISTORY_LOADING,
  GET_HISTORY_FAIL,
  CREATE_EVENT_FAIL,
  CREATE_EVENT
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getHistory = itemCount => (dispatch, getState) => {
  dispatch(setHistory());
  axios
    .get(`/api/events/${itemCount}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_HISTORY,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_HISTORY_FAIL
      });
    });
};

export const createEvent = event => (dispatch, getState) => {
  axios
    .post("/api/events", event, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: CREATE_EVENT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CREATE_EVENT_FAIL"
        )
      );
      dispatch({ type: CREATE_EVENT_FAIL });
    });
};

export const setHistory = () => {
  return {
    type: HISTORY_LOADING
  };
};
