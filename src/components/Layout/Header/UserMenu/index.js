/**
 * Created by vladtomsa on 25/10/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Account from 'mdi-material-ui/Account';
import Exit from 'mdi-material-ui/ExitToApp';

import styles from '../styles';

class UserMenu extends Component {

  state = {
    anchorEl: null,
  };

  togglePopover = (target) => this.setState({ anchorEl: target });

  render() {
    const { classes, onLogout, t } = this.props;
    const { anchorEl } = this.state;

    const menuOpen = Boolean(anchorEl);

    return (
      <Fragment>
        <IconButton
          key="userMenuToggle"
          className={classes.userMenuToggle}
          onClick={(ev) => this.togglePopover(ev.currentTarget)}
        >
          <Account />
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
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={() => {
                    this.togglePopover(null, null);
                  }}
                >
                  <ListItemIcon>
                    <Account />
                  </ListItemIcon>
                  <ListItemText inset primary={t('MY_PROFILE')} />
                </MenuItem>


                <MenuItem
                  onClick={() => {
                    this.togglePopover(null, null);
                    onLogout();
                  }}
                >
                  <ListItemIcon>
                    <Exit />
                  </ListItemIcon>
                  <ListItemText inset primary={t('LOGOUT')} />
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Collapse>
        </Popover>
      </Fragment>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

const withStyle = withStyles(styles)(UserMenu);

export default withStyle;



