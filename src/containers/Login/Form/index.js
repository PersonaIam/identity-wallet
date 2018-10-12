/**
 * Created by vladtomsa on 26/09/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Account from 'mdi-material-ui/Account';
import Eye from 'mdi-material-ui/Eye';
import EyeOff from 'mdi-material-ui/EyeOff';
import Key from 'mdi-material-ui/Key';

import { RenderTextField, RenderCheckbox } from 'components/FormInputs';

import styles from './styles';

const validate = (values) => {
  const errors = {};

  if (!values.username) errors.username = 'USERNAME_REQUIRED';

  if (!values.password) errors.password = 'PASSWORD_REQUIRED';

  return errors;
};

class Login extends Component {
  state = {
    showPassword: false,
  };

  toggleShowPassword = () => this.setState((prevState) => ({ showPassword: !prevState.showPassword }));

  handleMouseDownPassword = event => event.preventDefault();

  render() {
    const { classes, handleSubmit, isLoading, t } = this.props;

    return (
      <form className={classes.modalWrapper} onSubmit={handleSubmit}>
        <div>
          <Paper elevation={12}>
            <Paper className={`${classes.header} text-center`}>
              <div className="content">
                <Typography component="h4">{ t('LOGIN') }</Typography>
              </div>
              <LinearProgress />
            </Paper>

            <div className={classes.formContent}>
              <Field
                name="username"
                component={ RenderTextField }
                placeholder={t('USERNAME')}
                disabled={isLoading}
                required
                startAdornment={
                  <InputAdornment position="start">
                    <Account />
                  </InputAdornment>
                }
              />
              <br />
              <br />
              <Field
                name="password"
                component={ RenderTextField }
                type={this.state.showPassword ? 'text' : 'password'}
                placeholder={t('PASSOWRD')}
                disabled={isLoading}
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
                disabled={isLoading}
                label="REMEMBER_ME"
                color="primary"
              />
              <br />
              <br />
            </div>

            <div className="flex justify-center wrap-content">
              <Button variant="raised" color="primary" type="submit" className={`flex align-center ${classes.submitButton}`} disabled={isLoading}>
                <div className="flex align-center">
                  { t("LOGIN") }&nbsp;
                  {
                    isLoading
                      ? (
                        <CircularProgress size={16} />
                      )
                      : null
                  }
                </div>
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
  handleSubmit: PropTypes.func,
  isLoading: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withTranslate = translate('common')(Login);

const withStyle = withStyles(styles)(withTranslate);

export default reduxForm({
  form: 'LoginForm',
  validate,
})(withStyle);
