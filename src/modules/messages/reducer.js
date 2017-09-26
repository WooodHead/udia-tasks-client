import { ADD_APP_MESSAGE, DELETE_APP_MESSAGE } from "./constants";

const initialState = {
  messages: []
};

function messagesReducer(state = initialState, action) {
  let messages = [];
  switch (action.type) {
    case ADD_APP_MESSAGE:
      messages = [...state.messages];
      messages.unshift(action.data);
      return { ...state, messages };
    case DELETE_APP_MESSAGE:
      messages = [...state.messages];
      messages.splice(action.data, 1);
      return { ...state, messages };
    default:
      return state;
  }
}

export default messagesReducer;
