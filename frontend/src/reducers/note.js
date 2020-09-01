import {
  ADD_NOTE,
  GET_NOTE,
  DELETE_NOTE,
  GET_UPDATE_NOTE,
  UPDATE_NOTE,
  SEARCH_NOTE,
  CANCEL,
} from "../components/actions/types";

const initialState = {
  notes: [],
  update: {},
  searchArray: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTE:
      return {
        ...state,
        notes: [...action.payload],
      };
    case SEARCH_NOTE:
      return{
        ...state,
        searchArray: [...action.payload]
      }
    case ADD_NOTE:
      return {
        ...state,
        searchArray: [],
        notes: [...state.notes, action.payload],
      };
    case DELETE_NOTE:
      return {
        ...state,
        searchArray: [],
        notes: [...state.notes.filter((cur) => cur.id !== action.payload)],
      };
    case GET_UPDATE_NOTE:
      return {
        ...state,
        update: action.payload,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        searchArray: [],
        notes: [
          ...state.notes.filter((cur) => cur.id !== action.payload.id),
          action.payload
        ],
      };
    case CANCEL:
      return{
        ...state,
        searchArray:[]
      }
    default:
      return state;
  }
}
