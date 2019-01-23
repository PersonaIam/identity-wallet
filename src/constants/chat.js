/**
 * Created by vladtomsa on 16/01/2019
 */
export const chatConstants = {
  ON_SET_SOCKET: '@ON_SET_SOCKET',
  ON_SET_CHAT_USER: '@ON_SET_CHAT_USER',
  ON_SELECT_CONVERSATION: '@ON_SELECT_CONVERSATION',
  ON_SET_CONVERSATIONS: '@ON_SET_CONVERSATIONS',
  ON_RESET_CHAT: '@ON_RESET_CHAT',
};

export const socketEvents = {
  GET_CONVERSATION: 'get-conversation',
  GET_USERS_CONVERSATIONS: 'get-users-conversation',
  CREATE_CONVERSATION: 'create-conversation',
  CONVERSATION_CREATED: 'conversation-created',
  SEND_MESSAGE: 'send-message',
  MESSAGE_SENT: 'message-sent',
  RECONNECT: 'reconnect',
  REGISTER: 'register',
  LOGOUT: 'logout',
  UPDATE_LAST_SEEN_ON: 'update-last-seen-on',
  ERROR: 'socket-error',
};
