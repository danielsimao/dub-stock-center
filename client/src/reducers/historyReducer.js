import {
  GET_HISTORY,
  HISTORY_LOADING,
  GET_HISTORY_FAIL,
  CREATE_EVENT_FAIL,
  CREATE_EVENT
} from "../actions/types";

const initialState = {
  history: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload,
        loading: false
      };

    case CREATE_EVENT: {
      return {
        ...state,
        history: action.payload,
        loading: false
      };
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
