import { notificationActions } from 'constants/notification';

export const onNotificationSuccessInit = (notification) => ({
  type: notificationActions.ON_NOTIFICATION_SUCCESS_INIT,
  payload: {notification, type: 'success'}
});

export const onNotificationWarningInit = (notification) => ({
  type: notificationActions.ON_NOTIFICATION_WARNING_INIT,
  payload: {notification, type: 'warning'}
});

export const onNotificationErrorInit = (notification) => ({
  type: notificationActions.ON_NOTIFICATION_ERROR_INIT,
  payload: {notification, type: 'error'}
});

export const onNotificationClose = () => ({type: notificationActions.ON_NOTIFICATION_CLOSE});
