import { READ_MORE } from "../../components/actions/types";

export const readMore = (title,date,content) => (dispatch) => {
  dispatch({
      type: READ_MORE,
      payload: {title,date,content}
  })
}