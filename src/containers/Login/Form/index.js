/**
 * Created by vladtomsa on 26/09/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Email from 'mdi-material-ui/At';
import Eye from 'mdi-material-ui/Eye';
import EyeOff from 'mdi-material-ui/EyeOff';
import Facebook from 'mdi-material-ui/FacebookBox';
import Google from 'mdi-material-ui/Google';
import Key from 'mdi-material-ui/Key';

import { RenderTextField, RenderCheckbox } from 'components/FormInputs';

import styles from './styles';

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Username required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
  ) {
    errors.username = 'Invalid email address';
  }

  if (!values.password) errors.password = 'Password required';

  return errors;
};

class Login extends Component {
  state = {
    showPassword: false,
  };

  toggleShowPassword = () => this.setState((prevState) => ({ showPassword: !prevState.showPassword }));

  handleMouseDownPassword = event => event.preventDefault();

  render() {
    const { classes, handleSubmit, t } = this.props;

    return (
      <form className={classes.modalWrapper} onSubmit={handleSubmit}>
        <div>
          <Paper elevation={12}>
            <Paper className={`${classes.header} text-center`}>
              <div className="content">
                <Typography component="h4">{ t('Login') }</Typography>
              </div>
            </Paper>

            <div className={classes.formContent}>
              <Field
                name="username"
                component={ RenderTextField }
                type="email"
                placeholder="Email"
                required
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
              <br />
              <br />
              <Field
                name="password"
                component={ RenderTextField }
                type={this.state.showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                startAdornment={
                  <InputAdornment position="start">
                    <Key/>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.toggleShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? <EyeOff /> : <Eye />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <br />
              <br />
              <Field
                name="rememberMe"
                component={RenderCheckbox}
                label="Remember me"
                color="primary"
              />
              <br />
              <br />
            </div>

            <div className="flex justify-center wrap-content">
              <Button variant="raised" color="primary" type="submit" className="flex align-center">
                { t("Login") }
              </Button>
            </div>
            <br />
          </Paper>
        </div>
      </form>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withTranslate = translate('common')(Login);

const withStyle = withStyles(styles)(withTranslate);

export default reduxForm({
  form: 'LoginForm',
  validate,
})(withStyle);
