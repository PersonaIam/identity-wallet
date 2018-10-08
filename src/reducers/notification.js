import { notificationActions } from 'constants/notification';

const reducer = {
  [notificationActions.ON_NOTIFICATION_SUCCESS_INIT]: (state, { payload }) => ({ ...state, notification: payload, notificationType: notificationActions.NOTIFICATION_TYPES.SUCCESS }),
  [notificationActions.ON_NOTIFICATION_WARNING_INIT]: (state, { payload }) => ({ ...state, notification: payload, notificationType: notificationActions.NOTIFICATION_TYPES.WARNING }),
  [notificationActions.ON_NOTIFICATION_ERROR_INIT]: (state, { payload }) => ({ ...state, notification: payload, notificationType: notificationActions.NOTIFICATION_TYPES.ERROR }),
  [notificationActions.ON_NOTIFICATION_CLOSE]: (state) => ({ ...state, notification: null, notificationType: null }),
};

const initialState = {
  notification: null,
  notificationType: null,
};

export default (state = initialState, action) => {
  return reducer[action.type] ? reducer[action.type](state, action) : state;
};
