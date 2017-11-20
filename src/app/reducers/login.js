import {
  LOGGED_IN,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT
} from "../constants/login";

import {
  FETCH_USER_DATA,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_ERROR
} from "../constants/authentication";

const initialState = {
  loggedIn: false,
  processing: false,
  error: false,
  userData: []
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
        processing: true,
        error: false,
        userData: []
      };

    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        error: false,
        processing: false,
        userData: action.data
      };

    case FETCH_USER_DATA_ERROR:
      return {
        ...state,
        error: true,
        processing: false
      };
    case LOGIN:
      return {
        ...state,
        processing: true,
        error: false
      };
    case LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
        error: false,
        processing: false
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        processing: false,
        error: false
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loggedIn: false,
        processing: false,
        error: true
      };

    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        processing: false,
        error: false
      };
    default:
      return state;
  }
}
