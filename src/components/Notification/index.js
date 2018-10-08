import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'mdi-material-ui/Close';
import ErrorIcon from 'mdi-material-ui/AlertCircle';
import SuccessIcon from 'mdi-material-ui/CheckCircle';
import WarningIcon from 'mdi-material-ui/AlertCircleOutline';

import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-i18next';

import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
    padding: 0,
  },
  notificationIcon: {
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    boxShadow: ' 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: theme.spacing.unit,
      left: -1 * theme.spacing.unit * 2,
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4,
    },
    [theme.breakpoints.down('sm')]: {
      top: 6,
      position: 'relative',
    },
  },
  notificationSuccess: {
    color: theme.palette.secondary.main,
  },
  notificationWarning: {
    color: theme.palette.secondary.main,
  },
  notificationError: {
    color: theme.palette.error.main,
  }
});

const NOTIFICATION_POSITION = {
  vertical: 'top',
  horizontal: 'right'
};
const NOTIFICATION_TIMEOUT = 3000;

const Notification = (props) => {
  const { classes, notification, onNotificationClose, t } = props;

  let notificationIcon;

  switch (notification.type) {
    case ('success'):
      notificationIcon = <SuccessIcon classes={{root: classNames(classes.notificationIcon, classes.notificationSuccess)}}/>
      break;
    case ('warning'):
      notificationIcon = <WarningIcon classes={{root: classNames(classes.notificationIcon, classes.notificationWarning)}}/>
      break;
    default:
      notificationIcon = <ErrorIcon classes={{root: classNames(classes.notificationIcon, classes.notificationError)}}/>
      break;
  }

  let message = null;

  if (isString(notification.notification)) {
    message = notification.notification;
  }
  else if (isObject(notification.notification)) {
    message = notification.notification.message || notification.notification.errorMessage
  }

  return (
    <Snackbar
      open={!!(notification)}
      onClose={onNotificationClose}
      message={
        <span>
          { notificationIcon }&nbsp;{ t(message) }
        </span>
      }
      autoHideDuration={NOTIFICATION_TIMEOUT}
      anchorOrigin={NOTIFICATION_POSITION}
      action={[
        <IconButton
          key="close"
          color="inherit"
          className={classes.close}
          onClick={onNotificationClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  notification: PropTypes.any,
  onNotificationClose: PropTypes.func,
  t: PropTypes.func,
};

export default withStyles(styles)(translate('common')(Notification));
