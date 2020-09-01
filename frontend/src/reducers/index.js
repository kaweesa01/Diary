import { combineReducers } from "redux";
import readMore from "./readMore";
import color from "./color";
import note from "./note";
import errors from './errors';
import auth from "./auth";

export default combineReducers({
  readMore,
  errors,
  color,
  note,
  auth
});
