import {
  FETCHING_PEOPLE,
  FETCHING_PEOPLE_FAILURE,
  FETCHING_PEOPLE_SUCCESS,
  EMPTY_PEOPLE
} from "../constants/constants";
import { LOGOUT } from "../constants/login";

const initialState = {
  people: [],
  isFetching: false,
  error: false
};

export default function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_PEOPLE:
      return {
        ...state,
        isFetching: true,
        people: []
      };

    case FETCHING_PEOPLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        people: action.data
      };
    case FETCHING_PEOPLE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    case EMPTY_PEOPLE:
      return {
        ...state,
        people: []
      };

    case LOGOUT:
      return {
        ...state,
        people: []
      };
    default:
      return state;
  }
}
