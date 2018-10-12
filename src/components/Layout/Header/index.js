/**
 * Created by vladtomsa on 26/09/2018
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Account from 'mdi-material-ui/Account';
import Exit from 'mdi-material-ui/ExitToApp';
import Menu from 'mdi-material-ui/Menu';
import LanguageToggle from 'components/LanguageToggle';
import styles from './styles';

class Header extends Component {
  state = {
    anchorEl: null,
  };

  togglePopover = (target) => this.setState({ anchorEl: target });

  render() {
    const { classes, onLogout, t, userInfo, openSidenav } = this.props;
    const { anchorEl } = this.state;

    const userMenuOpen = Boolean(anchorEl);

    return (
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar variant="regular" className={classes.toolbar}>
            <div className={classes.logo}>
              <Hidden mdUp>
                <IconButton onClick={openSidenav}>
                  <Menu />
                </IconButton>
              </Hidden>
              <Link to="/">
                <img src="/images/persona-logo.png" alt="Logo"/>
              </Link>
            </div>

            <span className="fill-flex">&nbsp;</span>

            {
              userInfo && userInfo
                ? [
                  <IconButton
                    key="userMenuToggle"
                    className={classes.userMenuToggle}
                    onClick={(ev) => this.togglePopover(ev.currentTarget)}
                    onMouseEnter={(ev) => this.togglePopover(ev.currentTarget)}
                  >
                    <Account />
                  </IconButton>,
                  <Popover
                    key="userMenu"
                    open={userMenuOpen}
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
                    <Collapse in={userMenuOpen}>
                      <ClickAwayListener onClickAway={() => this.togglePopover(null)}>
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              this.togglePopover(null);
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
                ]
                : [
                  <Button
                    key="login"
                    component={Link}
                    to="/login"
                  >
                    { t('LOGIN') }
                  </Button>,
                  <Button
                    key="register"
                    component={Link}
                    to="/register"
                  >
                    { t('REGISTER') }
                  </Button>
                ]
            }
            &nbsp;&nbsp;
            <LanguageToggle />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  openSidenav: PropTypes.func.isRequired,
  userInfo: PropTypes.any,
};

const withStyle = withStyles(styles)(Header);

const withTranslate = translate('common')(withStyle);

export default withTranslate;
