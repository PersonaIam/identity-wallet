/**
 * Created by vladtomsa on 25/10/2018
 */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Bell from 'mdi-material-ui/Bell';

import { DATE_FORMAT, DAYS_BEFORE_EXPIRATION_NOTIFICATION } from 'constants';
import { getAttributeExpirationStatusAndRemainingDays, personaStampToDate } from 'helpers/personaService';
import moment from 'moment';
import styles from './styles';

class Notifications extends Component {

  state = {
    anchorEl: null,
  };

  togglePopover = (target) => this.setState({ anchorEl: target });

  getNotifications = () => {
    const { t, userInfo } = this.props;
    const notifications = [];

    const userAttributes = userInfo.userAttributes;

    userAttributes.forEach((attribute) => {
      const { expire_timestamp, type } = attribute;

      if (expire_timestamp) {
        const { remainingDays } = getAttributeExpirationStatusAndRemainingDays(expire_timestamp);

        if (remainingDays < 0) {
          const expirationDate = moment(personaStampToDate(expire_timestamp));

          notifications.push(t('ATTRIBUTE_EXPIRED', { attribute: t(type), date: expirationDate.format(DATE_FORMAT) }));
        }
        else if (remainingDays < DAYS_BEFORE_EXPIRATION_NOTIFICATION) {
          notifications.push(t('ATTRIBUTE_ABOUT_TO_EXPIRE', { attribute: t(type), days: remainingDays }));
        }
      }
    });

    return notifications;
  };

  render() {
    const { classes, t } = this.props;
    const { anchorEl } = this.state;

    const menuOpen = Boolean(anchorEl);
    const notifications = this.getNotifications();

    return (
      <Fragment>
        <IconButton
          key="notifications"
          className={classes.userMenuToggle}
          onClick={(ev) => this.togglePopover(ev.currentTarget)}
        >
          <Badge
            badgeContent={
              notifications.length
                ? (
                  notifications.length > 9
                    ? '9+'
                    : notifications.length
                )
                : ''
            }
            classes={{ badge: notifications.length ? classes.badge : '' }}
          >
            <Bell/>
          </Badge>
        </IconButton>

        <Popover
          open={menuOpen}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          disableRestoreFocus
        >
          <Collapse in={menuOpen}>
            <ClickAwayListener onClickAway={() => this.togglePopover(null)}>
              <MenuList>
                {
                  notifications && notifications.length
                    ? (
                      notifications.map((notification, index) => (
                        <Fragment key={notification}>
                          <MenuItem
                            key={notification}
                            component={Link}
                            to="/identity"
                          >
                            <ListItemText
                              onClick={() => this.togglePopover(null)}
                              primary={notification}
                            />
                          </MenuItem>

                          {
                            index < notifications.length - 1
                              ? <Divider />
                              : null
                          }
                        </Fragment>
                      ))
                    )
                    : (
                      <MenuItem>
                        <ListItemText primary={t('NO_MESSAGES_AVAILABLE')} />
                      </MenuItem>
                    )
                }
              </MenuList>
            </ClickAwayListener>
          </Collapse>
        </Popover>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

const withStyle = withStyles(styles)(Notifications);

export default withStyle;



