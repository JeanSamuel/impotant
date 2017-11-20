import {
  FETCH_SOLDE,
  FETCH_SOLDE_ERROR,
  FETCH_SOLDE_SUCCESS
} from "../constants/transaction";

const initialState = {
  isFetching: false,
  error: false,
  solde: []
};

export default function soldeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SOLDE:
      return {
        ...state,
        isFetching: true,
        solde: []
      };
    case FETCH_SOLDE_SUCCESS:
      return {
        ...state,
        error: false,
        isFetching: false,
        solde: action.data
      };
    case FETCH_SOLDE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
}
