import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Zoom from 'react-reveal/Zoom';
import { login } from 'actions/auth';
import { authConstants } from 'constants/auth';
import LoginForm from './Form';
import styles from './styles';

class Login extends Component {
  onLogin = ({ username, password, rememberMe }) => {
    this.props.login({ username, password, rememberMe });
  };

  render() {
    const { classes, isLoading } = this.props;
    return (
      <Fragment>
        <div className={classes.loginContent}>
          <Zoom top>
            <LoginForm
              onSubmit={this.onLogin}
              isLoading={isLoading}
            />
          </Zoom>
        </div>
      </Fragment>
    );
  }
}

Login.propTypes = {
  isLoading: PropTypes.any,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading === authConstants.ON_LOGIN_INIT,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Login);

const withStyle = withStyles(styles)(withConnect);

export default withStyle;
