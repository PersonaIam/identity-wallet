/**
 * Created by vladtomsa on 16/01/2019
 */
import io from 'socket.io-client';
import { chatConstants, socketEvents } from 'constants/chat';

const extractUserConversation = (conversation , personaAddress) => {
  const { id, name, conversationMembers, updatedAt } = conversation;

  const conversationName = name
    .replace(personaAddress, '')
    .replace('-', '');

  console.log(conversation);
  return {
    id,
    name: conversationName,
    members: conversationMembers.map(m => m.personaAddress),
    notifications: 0,
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

      const userConversationInfo = extractUserConversation(conversation, personaAddress);

      if (
        selectedConversation
        && selectedConversation.id
        && selectedConversation.id !== conversation.id
      ) {
        userConversationInfo.notifications = 1;
      }
      else {
        dispatch(toggleSelectedConversation(userConversationInfo));
      }

      dispatch(setConversations([...conversations, userConversationInfo]));
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

        dispatch(toggleSelectedConversation(newConversation));
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
        dispatch(setChatUserInfo(userChatInfo));

        getUsersConversations(userChatInfo.personaAddress)(dispatch, getState);
      },
    );
  }
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
        const selectedConversationInfo = conversationInfo || {
          conversationMembers: [
            ...members.map(m => ({ personaAddress: m })),
          ],
          conversationMessages: [],
        };

        dispatch(toggleSelectedConversation(selectedConversationInfo));
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
      (userConversations) => {
        const conversations = userConversations.map(c => extractUserConversation(c, personaAddress));

        dispatch(setConversations(conversations));
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
    socket.emit(
      socketEvents.CREATE_CONVERSATION,
      { members, message },
    );
  }
  else {
    socket.emit(
      socketEvents.SEND_MESSAGE,
      {
        conversationId,
        message,
      }
    )
  }
};

export const toggleSelectedConversation = (selectedConversation) => ({ type: chatConstants.ON_SELECT_CONVERSATION, payload: selectedConversation });

const setSocket = (socket) => ({ type: chatConstants.ON_SET_SOCKET, payload: socket });

const setChatUserInfo = (user) => ({ type: chatConstants.ON_SET_CHAT_USER, payload: user });

const setConversations = (conversations) => ({ type: chatConstants.ON_SET_CONVERSATIONS, payload: conversations });
