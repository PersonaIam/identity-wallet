/**
 * Created by vladtomsa on 26/09/2018
 */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Menu from 'mdi-material-ui/Menu';
import LanguageToggle from 'components/LanguageToggle';
import styles, { toolbarMarginTop } from './styles';
import Notifications from './Notifications';
import UserMenu from './UserMenu';


export class Header extends Component {

  render() {
    const { classes, isFixed, onLogout, openSidenav, t, userInfo } = this.props;

    return (
      <Fragment>
        <AppBar position="static" className={classes.appBar} style={{ marginTop: `${isFixed ? 0 : toolbarMarginTop}px` }}>
          <Toolbar variant="regular" className={classes.toolbar}>
            <div className={classes.logo}>
              <Hidden mdUp>
                <IconButton
                  data-test-id="sidenav-menu"
                  onClick={openSidenav}
                >
                  <Menu />
                </IconButton>
              </Hidden>
              <Link to="/">
                <img src="/images/persona-logo.png" alt="Logo"/>
              </Link>
            </div>

            <span className="fill-flex">&nbsp;</span>

            {
              !!userInfo
                ? [
                  <UserMenu
                    key="user-menu"
                    data-test-id="user-menu"
                    t={t}
                    userInfo={userInfo}
                    onLogout={onLogout}
                  />,

                  <Notifications
                    key="notifications"
                    data-test-id="notifications"
                    t={t}
                    userInfo={userInfo}
                  />,
                ]
                : [
                  <Button
                    key="login"
                    data-test-id="login"
                    component={Link}
                    to="/login"
                  >
                    { t('LOGIN') }
                  </Button>,

                  <Button
                    key="register"
                    data-test-id="register"
                    component={Link}
                    to="/register"
                  >
                    { t('REGISTER') }
                  </Button>
                ]
            }
            &nbsp;&nbsp;
            <LanguageToggle data-test-id="language-toggle"/>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isFixed: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
  openSidenav: PropTypes.func.isRequired,
  userInfo: PropTypes.any,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(Header);

export default withStyle;
