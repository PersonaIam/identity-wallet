/**
 * Created by vladtomsa on 26/09/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import Eye from 'mdi-material-ui/Eye';
import EyeOff from 'mdi-material-ui/EyeOff';
import Info from 'mdi-material-ui/Information';
import Key from 'mdi-material-ui/Key';
import KeyChange from 'mdi-material-ui/KeyChange';

import { RenderTextField } from 'components/FormInputs';
import RecaptchaField from 'components/FormInputs/Recaptcha';

import styles from './styles';

const strongPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const validate = (values) => {
  const errors = {};

  if (!values.password) errors.password = 'Password required';
  else if (!strongPasswordRegex.test(values.password)) errors.password = 'Password to week';

  if (!values.passwordConfirmation) errors.passwordConfirmation = 'Please confirm password';

  if (values.password && values.passwordConfirmation && values.password !== values.passwordConfirmation)
    errors.passwordConfirmation = 'Passwords do not match';

  if (!values.isCaptchaVerified) errors.isCaptchaVerified = 'Please confirm your authenticity';

  return errors;
};

class CreatePasswordForm extends Component {
  state = {
    showPassword: false,
  };

  toggleShowPassword = () => this.setState((prevState) => ({ showPassword: !prevState.showPassword }));

  handleMouseDownPassword = event => event.preventDefault();

  render() {
    const { classes, handleSubmit, isLoading, t } = this.props;

    const passwordHint = (
      <div className={classes.tooltipContainer}>
        <Typography component="p">
          { t('Must contain at least 1 lowercase alphabetical character;') }
        </Typography>

        <Typography component="p">
          { t('Must contain at least 1 uppercase alphabetical character;') }
        </Typography>

        <Typography component="p">
          { t('Must contain at least 1 numeric character;') }
        </Typography>

        <Typography component="p">
          { t('Must contain at least 1 special character;') }
        </Typography>

        <Typography component="p">
          { t('Must be 8 characters or longer;') }
        </Typography>
      </div>
    );

    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.formContent}>
          <Field
            name="password"
            component={ RenderTextField }
            type={this.state.showPassword ? 'text' : 'password'}
            label="Password"
            disabled={isLoading}
            required
            startAdornment={
              <InputAdornment position="start">
                <Key/>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Fragment>
                  {/*<IconButton*/}
                    {/*aria-label="Toggle password visibility"*/}
                    {/*onClick={this.toggleShowPassword}*/}
                    {/*onMouseDown={this.handleMouseDownPassword}*/}
                  {/*>*/}
                    {/*{this.state.showPassword ? <EyeOff /> : <Eye />}*/}
                  {/*</IconButton>*/}

                  <Tooltip title={passwordHint}>
                    <Info />
                  </Tooltip>
                </Fragment>
              </InputAdornment>
            }
          />
          <br />
          <br />
          <Field
            name="passwordConfirmation"
            component={ RenderTextField }
            type={this.state.showPassword ? 'text' : 'password'}
            label="Password Confirmation"
            disabled={isLoading}
            required
            startAdornment={
              <InputAdornment position="start">
                <KeyChange />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Fragment>
                  {/*<IconButton*/}
                    {/*aria-label="Toggle password visibility"*/}
                    {/*onClick={this.toggleShowPassword}*/}
                    {/*onMouseDown={this.handleMouseDownPassword}*/}
                  {/*>*/}
                    {/*{this.state.showPassword ? <EyeOff /> : <Eye />}*/}
                  {/*</IconButton>*/}

                  <Tooltip title={passwordHint}>
                    <Info />
                  </Tooltip>
                </Fragment>
              </InputAdornment>
            }
          />
          <br />
          <br />
          <br />

          {/*<Field*/}
            {/*name="isCaptchaVerified"*/}
            {/*component={ RecaptchaField }*/}
          {/*/>*/}
          {/*<br />*/}
          {/*<br />*/}
        </div>

        <div className="flex justify-center wrap-content">
          <Button variant="raised" color="primary" type="submit" className={`flex align-center ${classes.submitButton}`} disabled={isLoading}>
            <div className="flex align-center">
              { t("Create password") }&nbsp;
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
      </form>
    )
  }
}

CreatePasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withTranslate = translate('common')(CreatePasswordForm);

const withStyle = withStyles(styles)(withTranslate);

export default reduxForm({
  form: 'CreatePasswordForm',
  // validate,
})(withStyle);
