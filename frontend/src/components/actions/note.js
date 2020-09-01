import {
  ADD_NOTE,
  GET_NOTE,
  DELETE_NOTE,
  GET_UPDATE_NOTE,
  UPDATE_NOTE,
  SEARCH_NOTE,
  CANCEL,
  SEND_ERRORS,
  SEND_MESSAGE,
} from "./types";
import axios from "axios";

import { tokenConfig } from "../actions/auth";

// Get note
export const getNote = () => (dispatch,getState) => {
  axios
    .get("/api/diary/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_NOTE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response));
};

// Add note
export const addNote = (note) => (dispatch,getState) => {
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };

  axios
    .post("/api/diary/", note, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_NOTE,
        payload: res.data,
      });
      dispatch({
        type: SEND_MESSAGE,
        payload: { add: "Note added" },
      });
    })
    .catch((err) => {
      dispatch({
        type: SEND_ERRORS,
        payload: err.response.data,
      });
      console.log(err.response);
    });
};

// Delete note
export const deleteNote = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/diary/${id}/`, tokenConfig(getState))
    .then(
      dispatch({
        type: SEND_MESSAGE,
        payload: { delete: "Note deleted" },
      }),
      dispatch({
        type: DELETE_NOTE,
        payload: id,
      })
    )
    .catch((err) => console.log(err.response));
};

// Get note to be updated
export const getNoteUpdate = (id) => (dispatch, getState) => {
  axios
    .get(`/api/diary/${id}/` ,tokenConfig(getState))
    .then((res) => {
      const {
        id,
        title,
        content,
        textDecoration,
        fontWeight,
        fontStyle,
      } = res.data;
      const updateDate = {
        id,
        title,
        content,
        textDecoration,
        fontWeight,
        fontStyle,
      };
      dispatch({
        type: GET_UPDATE_NOTE,
        payload: updateDate,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

// update note
export const updateNote = (id, note) => (dispatch, getState) => {
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };

  axios
    .put(`/api/diary/${id}/`, note, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_NOTE,
        payload: res.data,
      });
      dispatch({
        type: SEND_MESSAGE,
        payload: { update: "Note Updated" },
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const searchNote = (searchArray, searchTerm) => (dispatch) => {
  const filterItems = searchArray.filter(
    (item) => item.title.toLowerCase().indexOf(searchTerm) > -1
  );
  if (filterItems.length === 0) {
    dispatch({
      type: SEND_MESSAGE,
      payload: { search: "No search result" },
    });
  }
  dispatch({
    type: SEARCH_NOTE,
    payload: filterItems,
  });
};

export const cancelActivities = () => (dispatch) => {
  dispatch({
    type: CANCEL,
  });
};
