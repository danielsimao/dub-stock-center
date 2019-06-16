import {
  GET_HISTORY,
  HISTORY_LOADING,
  GET_HISTORY_FAIL,
  CREATE_EVENT_FAIL,
  CREATE_EVENT
} from "../actions/types";

const initialState = {
  history: [],
  count: 0,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload.events,
        count: action.payload.count,
        loading: false
      };
    case CREATE_EVENT: {
      if (state.history.length === state.count) {
        return {
          ...state,
          history: [action.payload, ...state.history],
          count: state.count + 1,
          loading: false
        };
      } else {
        state.history.pop();
        return {
          ...state,
          history: [action.payload, ...state.history],
          count: state.count + 1,
          loading: false
        };
      }
    }
    case HISTORY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_HISTORY_FAIL:
    case CREATE_EVENT_FAIL:
    default:
      return state;
  }
}
