/**
 * Created by vladtomsa on 26/09/2018
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import LanguageToggle from 'components/LanguageToggle';
import styles from './styles';

const Header = ({ classes, t }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="regular">
        <Link to="/">
          <img src="/images/persona-logo.png" alt="Logo" className={classes.logo}/>
        </Link>
        <span className="fill-flex"></span>
        {
          [
            <Button
              key="login"
              classes={{root: classes.loginButton}}
              color="inherit"
              component={Link}
              to="/login"
            >
              { t('Login') }
            </Button>,
            <Button
              key="register"
              classes={{root: classes.registerButton}}
              color="primary"
              variant="raised"
              component={Link}
              to="/register"
            >
              { t('Register') }
            </Button>
          ]
        }
        <LanguageToggle />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const withStyle = withStyles(styles)(Header);

const withTranslate = translate('common')(withStyle);

export default withTranslate;
