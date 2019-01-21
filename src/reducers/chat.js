/**
 * Created by vladtomsa on 16/01/2019
 */
import { chatConstants } from 'constants/chat';

const initialState = {
  socket: null,
  chatUser: null,
  conversations: [],
  selectedConversation: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case (chatConstants.ON_SET_SOCKET):
      return { ...state, socket: payload };

    case (chatConstants.ON_SET_CHAT_USER):
      return { ...state, chatUser: payload };

    case (chatConstants.ON_SELECT_CONVERSATION):
      return { ...state, selectedConversation: payload };

    case (chatConstants.ON_SET_CONVERSATIONS):
      return { ...state, conversations: payload };

    default:
      return state;
  }
}
