import {
  LOGGED_IN,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT
} from "../constants/login";

import { emptyPeople } from "./actions";
import {
  fetchUserData,
  fetchUserDataError,
  fetchUserDataSuccess
} from "./authentication";

import {
  FETCH_USER_DATA,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_ERROR
} from "../constants/authentication";
import Services from "../services/services";
import { NavigationActions } from "react-navigation";

const services = new Services();
export function loginFromAPI(webviewState) {
  return dispatch => {
    dispatch(fetchUserData());
    services
      .loginAPI(webviewState)
      .then(userData => {
        dispatch(fetchUserDataSuccess(userData));
      })
      .catch(err => dispatch(fetchUserDataError()));
  };
}

export function login() {
  return {
    type: LOGIN
  };
}

export function loginSucess() {
  return {
    type: LOGIN_SUCCESS
  };
}

export function loginError() {
  return {
    type: LOGIN_ERROR
  };
}

export function loggedIn(data) {
  return {
    type: LOGGED_IN,
    data
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(logout());
    dispatch(emptyPeople());
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
