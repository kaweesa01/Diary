import { SEND_ERRORS, SEND_MESSAGE } from "../components/actions/types";

const initialState = {
  error: {},
  message: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state;
  }
}
