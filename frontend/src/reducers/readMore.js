import { READ_MORE } from "../components/actions/types";

const initialState = {
   title : '',
   date : '',
   content : ''
}

export default function(state = initialState, action) {
   switch (action.type) {
       case READ_MORE:
        return{
          ...state,
          title: action.payload.title,
          date:action.payload.date,
          content:action.payload.content,
        }
       default:
           return state;
   }
}