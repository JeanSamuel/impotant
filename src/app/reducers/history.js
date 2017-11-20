import {
  FETCH_HISTORY,
  FETCH_HISTORY_ERROR,
  FETCH_HISTORY_SUCCESS,
  FETCH_HISTORY_IN,
  FETCH_HISTORY_OUT,
  SHOW_SEARCH_BAR,
  HIDE_SEARCH_BAR
} from "../constants/transaction";

import Services from "../services/history";

const services = new Services();

const initialState = {
  processing: false,
  done: false,
  error: false,
  search: false,
  historyIn: [],
  historyOut: [],
  data: [],
  history: []
};

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HISTORY:
      return {
        ...state,
        done: false,
        processing: true,
        search: false,
        data: [],
        history: [],
        historyIn: [],
        historyOut: []
      };

    case FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        processing: false,
        data: action.data,
        search: false,
        done: true,
        history: action.data,
        historyIn: action.dataIn,
        historyOut: action.dataOut
      };
    case FETCH_HISTORY_IN:
      return {
        ...state,
        data: state.historyIn
      };
    case FETCH_HISTORY_OUT:
      return {
        ...state,
        data: state.historyOut
      };
    case FETCH_HISTORY_ERROR:
      return {
        ...state,
        processing: false,
        error: true
      };

    case SHOW_SEARCH_BAR:
      return {
        ...state,
        search: true
      };
    case HIDE_SEARCH_BAR:
      return {
        ...state,
        search: false
      };
    default:
      return state;
  }
}
