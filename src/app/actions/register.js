import {
  REGISTER,
  REGISTER_FAILED,
  REGISTER_SUCCESS
} from "../constants/register";

import configs from "../config/appConstants";
import Services from "../services/services";

const services = new Services();

export function registerToAPI() {
  return dispatch => {
    dispatch(register());
    services
      .registerAnonyme()
      .then(registerResponse => registerResponse.json())
      .then(json => {
        dispatch(registerSuccess(json));
      })
      .catch(err => dispatch(registerFailed()));
  };
}
export function register() {
  return dispatch => {
    type: REGISTER;
  };
}

export function registerSuccess(data) {
  return dispatch => {
    type: REGISTER_SUCCESS, data;
  };
}

export function registerFailed(data) {
  return dispatch => {
    type: REGISTER_FAILED, data;
  };
}
