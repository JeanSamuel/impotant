import {
  REGISTER,
  REGISTER_FAILED,
  REGISTER_SUCCESS
} from "../constants/register";

const initialState = {
  processing: false,
  error: false,
  registerResponse: []
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        processing: true,
        registerResponse: []
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        processing: false,
        registerResponse: action.data
      };

    case REGISTER_FAILED:
      return {
        ...state,
        processing: false,
        error: true
      };
    default:
      return state;
  }
}
