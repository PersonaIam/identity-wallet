import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from "react-router-redux";
import { withStyles } from '@material-ui/core/styles';
import Zoom from 'react-reveal/Zoom';
import LoginForm from './Form';
import styles from './styles';

class Login extends Component {
  onLogin = ({ username, password, rememberMe }) => {
    debugger;
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.loginContent}>
          <Zoom top>
            <LoginForm
              onSubmit={this.onLogin}
            />
          </Zoom>
        </div>
      </Fragment>
    );
  }
}

const withStyle = withStyles(styles)(Login);

export default withStyle;
