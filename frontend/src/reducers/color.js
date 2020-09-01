import {
  CHANGE_COLOR,
  GET_DB_COLOR,
  RESET_COLOR_STATE,
} from "../components/actions/types";

const initialState = {
  id: null,
  firstcolor: "",
  secondcolor: "",
  hsl: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_COLOR_STATE:
      return {
        id: null,
        firstcolor: "",
        secondcolor: "",
        hsl: null,
      };
    case CHANGE_COLOR:
      return {
        firstcolor: action.payload.firstcolor,
        secondcolor: action.payload.secondcolor,
        hsl: action.payload.hsl,
      };
    case GET_DB_COLOR:
      return {
        id: action.payload[0].id,
        firstcolor: action.payload[0].firstcolor,
        secondcolor: action.payload[0].secondcolor,
        hsl: action.payload[0].hsl,
      };
    default:
      return state;
  }
}
