import {
  FETCHING_PEOPLE,
  FETCHING_PEOPLE_FAILURE,
  FETCHING_PEOPLE_SUCCESS,
  EMPTY_PEOPLE
} from "../constants/constants";

export function fetchPeopleFromAPI() {
  return dispatch => {
    dispatch(getPeople());
    fetch("https://swapi.co/api/people/")
      .then(response => response.json())
      .then(json => dispatch(getPeopleSuccess(json.results)))
      .catch(err => dispatch(getPeopleFailure()));
  };
}

export function getPeople() {
  return {
    type: FETCHING_PEOPLE
  };
}

export function getPeopleSuccess(data) {
  return {
    type: FETCHING_PEOPLE_SUCCESS,
    data
  };
}

export function getPeopleFailure() {
  return {
    type: FETCHING_PEOPLE_FAILURE
  };
}

export function emptyPeople() {
  return {
    type: EMPTY_PEOPLE
  };
}
