import {
  FETCH_USER_DATA,
  FETCH_USER_DATA_ERROR,
  FETCH_USER_DATA_SUCCESS
} from "../constants/authentication";

export function fetchUserData() {
  return {
    type: FETCH_USER_DATA
  };
}

export function fetchUserDataSuccess(data) {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    data
  };
}

export function fetchUserDataError() {
  return {
    type: FETCH_USER_DATA_ERROR
  };
}
