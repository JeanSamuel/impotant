import {
  TRANSACTION,
  TRANSACTION_ERROR,
  TRANSACTION_SUCCESS
} from "../constants/transaction";
import Services from "../services/transaction";

const services = new Services();

export function doTransactonToAPI(amount, senderId, currency, recipientId) {
  return dispatch => {
    dispatch(doTransaction());
    services
      .performTransation(amount, senderId, currency, recipientId)
      .then(response => dispatch(transactionSuccess(response)))
      .catch(err =>
        dispatch(transactionError("Soldes insuffisant(Hard coded)"))
      );
  };
}
export function doTransaction() {
  return {
    type: TRANSACTION
  };
}

export function transactionError() {
  return {
    type: TRANSACTION_ERROR
  };
}

export function transactionSuccess(data) {
  return {
    type: TRANSACTION_SUCCESS,
    data
  };
}
