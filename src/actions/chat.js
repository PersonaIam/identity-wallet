/**
 * Created by vladtomsa on 16/01/2019
 */
import io from 'socket.io-client';
import { reset } from 'redux-form';
import { chatConstants, socketEvents } from 'constants/chat';
import { onNotificationErrorInit } from './notifications';


const getNewConversationData = (members) => {
  return {
    conversationMembers: [
      ...members.map(m => ({ personaAddress: m })),
    ],
    conversationMessages: [],
    name: members.join('-'),
  };
};

const extractUserConversation = (conversation , personaAddress) => {
  const { id, name, conversationMembers, notifications, updatedAt } = conversation;

  const conversationName = name
    .replace(personaAddress, '')
    .replace('-', '');

  return {
    id,
    name: conversationName,
    members: conversationMembers.map(m => m.personaAddress),
    notifications,
    updatedAt,
  };
};

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

  socket.on(
    socketEvents.CONVERSATION_CREATED,
    (conversation) => {
      const {
        auth: { userInfo: { personaAddress } },
        chat: { selectedConversation, conversations },
      } = getState();

      if (selectedConversation && !selectedConversation.id) {
        dispatch(toggleSelectedConversation(socket, conversation));
      }

      dispatch(setConversations([...conversations, extractUserConversation(conversation, personaAddress)]));
    },
  );

  socket.on(
    socketEvents.MESSAGE_SENT,
    (message) => {
      const { chat: { conversations, selectedConversation } } = getState();

      if (
        selectedConversation
        && selectedConversation.id
        && selectedConversation.id === message.conversationId
      ) {
        const newConversation = {
          ...selectedConversation,
          conversationMessages: [
            ...selectedConversation.conversationMessages,
            message,
          ],
        };

        dispatch(toggleSelectedConversation(socket, newConversation));
      }
      else {
        const newConversations = conversations.map(c => {
          return c.id === message.conversationId
            ? {
              ...c,
              notifications: c.notifications + 1,
            }
            : c;
        });

        dispatch(setConversations(newConversations));
      }
    },
  );

  socket.on(
    socketEvents.ERROR,
    (message) => dispatch(onNotificationErrorInit(message)),
  );

  dispatch(setSocket(socket));
};

/**
 * Register loggedIn user to chat
 * */
export const registerUserToChat = (userInfo) => (dispatch, getState) => {
  const {
    chat: { socket },
  } = getState();

  if (socket) {
    socket.emit(
      socketEvents.REGISTER,
      userInfo,
      (userChatInfo) => {
        if (userChatInfo && userChatInfo.personaAddress) {
          dispatch(setChatUserInfo(userChatInfo));

          getUsersConversations(userChatInfo.personaAddress)(dispatch, getState);
        }
      },
    );
  }
};

export const leaveChat = () => (dispatch, getState) => {
  const {
    chat: { socket },
  } = getState();

  if (socket) {
    socket.emit(
      socketEvents.LOGOUT,
    );
  }

  dispatch(resetChat());
};

/**
 * Based on selected members of the conversation
 * 1. If a previous chat exists between them get that chat and activate it
 * 2. Otherwise create a blank chat, and create it when the first message is sent
 * */
export const openConversation = (members) => (dispatch, getState) => {
  const {
    chat: { socket } ,
  } = getState();

  if (socket) {
    socket.emit(
      socketEvents.GET_CONVERSATION,
      [...members],
      (conversationInfo) => {
        const selectedConversationInfo = conversationInfo || getNewConversationData(members);

        dispatch(toggleSelectedConversation(socket, selectedConversationInfo));
      },
    );
  }
};

export const getUsersConversations = (personaAddress) => (dispatch, getState) => {
  const {
    chat: { socket },
  } = getState();

  if (socket) {
    socket.emit(
      socketEvents.GET_USERS_CONVERSATIONS,
      (conversations) => {
        dispatch(setConversations(conversations ? conversations.map(c => extractUserConversation(c, personaAddress)) : []));
      },
    );
  }
};

export const sendMessage = (data) => async (dispatch, getState) => {
  const {
    chat: { socket } ,
  } = getState();

  const { conversationId, members, message } = data;

  if (!conversationId) {
    createConversation(socket, members, message);
  }
  else {
    sendMessageToConversation(socket, conversationId, message);
  }

  dispatch(reset('ChatForm'));
};

export const toggleSelectedConversation = (socket, selectedConversation) => {
  if (selectedConversation && selectedConversation.id) {
    socket.emit(
      socketEvents.UPDATE_LAST_SEEN_ON,
      selectedConversation.id,
    );
  }

  return { type: chatConstants.ON_SELECT_CONVERSATION, payload: selectedConversation };
};

const setSocket = (socket) => ({ type: chatConstants.ON_SET_SOCKET, payload: socket });

const setChatUserInfo = (user) => ({ type: chatConstants.ON_SET_CHAT_USER, payload: user });

const setConversations = (conversations) => ({ type: chatConstants.ON_SET_CONVERSATIONS, payload: conversations });

const createConversation = (socket, members, message) => {
  socket.emit(
    socketEvents.CREATE_CONVERSATION,
    { members, message },
  );
};

const sendMessageToConversation = (socket, conversationId, message) => {
  socket.emit(
    socketEvents.SEND_MESSAGE,
    {
      conversationId,
      message,
    }
  );
};

const resetChat = () => ({ type: chatConstants.ON_RESET_CHAT });
