import {
  TRANSACTION,
  TRANSACTION_ERROR,
  TRANSACTION_SUCCESS
} from "../constants/transaction";

const initialState = {
  processing: false,
  error: false,
  done: false,
  errorMessage: "",
  response: []
};

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSACTION:
      return {
        ...state,
        done: false,
        processing: true,
        response: []
      };
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        processing: false,
        done: true,
        response: action.data
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        processing: false,
        error: true,
        errorMessage: action.data
      };
    default:
      return state;
  }
}
