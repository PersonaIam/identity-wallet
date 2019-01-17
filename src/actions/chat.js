/**
 * Created by vladtomsa on 16/01/2019
 */
import io from 'socket.io-client';
import { chatConstants, socketEvents } from 'constants/chat';

/**
 * Connect to the websocket server
 * */
export const createChatConnection = () => (dispatch, getState) => {
  const socket = io.connect(`${API_URL}`);

  socket.on(
    socketEvents.RECONNECT,
    () => {
      const { chat: { chatUser } } = getState();

      if (chatUser) {
        dispatch(registerUserToChat(chatUser));
      }
    },
  );

  dispatch(setSocket(socket));
};

/**
 * Register loggedIn user to chat
 * */
export const registerUserToChat = (userInfo) => (dispatch, getState) => {
  const { chat: { socket } } = getState();

  if (socket) {
    socket.emit(
      socketEvents.REGISTER,
      userInfo,
      (userChatInfo) => dispatch(setChatUser(userChatInfo))
    );
  }
};

export const openConversation = (members) => (dispatch, getState) => {
  const { chat: { socket } } = getState();

  if (socket) {
    socket.emit(
      socketEvents.OPEN_CONVERSATION,
      members,
      console.log,
      //(userChatInfo) => dispatch(setChatUser(userChatInfo))
    );
  }
};

const setSocket = (socket) => ({ type: chatConstants.ON_SET_SOCKET, payload: socket });
const setChatUser = (userInfo) => ({ type: chatConstants.ON_SET_CHAT_USER, payload: userInfo });
