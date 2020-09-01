import { CHANGE_COLOR, GET_DB_COLOR } from "../actions/types";
import axios from "axios";
import { tokenConfig } from "../actions/auth";


export const getColor = (id,color) => (dispatch, getState) => {
  axios.put(`/api/color/${id}/`, color , tokenConfig(getState)).then((res) => {
    dispatch({
      type: CHANGE_COLOR,
      payload: color,
    });
  }).catch(err => console.log(err.response));
 
};

export const getDbColor = () => (dispatch, getState) => {
  axios
    .get("/api/color",tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_DB_COLOR,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};
