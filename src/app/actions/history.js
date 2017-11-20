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
export function fetchHistoryFromApi(accountId) {
  return dispatch => {
    dispatch(fetchHistory);
    services
      .getHistory(accountId)
      .then(history => {
        dispatch(
          fetchHistorySuccess(
            history,
            services.getReceivedTransaction(history, accountId),
            services.getSentTransactionData(history, accountId)
          )
        );
      })
      .catch(err => dispatch(fetchHistoryError()));
  };
}

export function fetchHistoryAll(history) {
  return dispatch => {
    dispatch(fetchHistorySuccess(history));
  };
}

export function fetchHistory() {
  return {
    type: FETCH_HISTORY
  };
}

export function fetchHistoryIn() {
  return {
    type: FETCH_HISTORY_IN
  };
}

export function fetchHistoryOut() {
  return {
    type: FETCH_HISTORY_OUT
  };
}
export function fetchHistorySuccess(data, dataIn, dataOut) {
  return {
    type: FETCH_HISTORY_SUCCESS,
    data,
    dataIn,
    dataOut
  };
}
export function fetchHistoryError() {
  return {
    type: FETCH_HISTORY_ERROR
  };
}

export function showSearchBar() {
  return {
    type: SHOW_SEARCH_BAR
  };
}

export function hideSearchBar() {
  return {
    type: HIDE_SEARCH_BAR
  };
}
