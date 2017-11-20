import {
  FETCH_SOLDE,
  FETCH_SOLDE_ERROR,
  FETCH_SOLDE_SUCCESS
} from "../constants/transaction";

import Services from "../services/services";

const services = new Services();

export function fetchSoldeFromAPI(accountId) {
  return dispatch => {
    dispatch(fetchSolde());
    services
      .checkSolde(accountId)
      .then(solde => dispatch(fetchSoldeSuccess(solde)))
      .catch(err => dispatch(fetchSoldeError()));
  };
}

export function fetchSolde() {
  return {
    type: FETCH_SOLDE
  };
}
export function fetchSoldeSuccess(data) {
  return {
    type: FETCH_HISTORY_SUCCESS,
    data
  };
}

export function fetchSoldeError() {
  return {
    type: FETCH_SOLDE_ERROR
  };
}
