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
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Info from 'mdi-material-ui/Information';
import Key from 'mdi-material-ui/Key';
import KeyChange from 'mdi-material-ui/KeyChange';

import { RenderTextField } from 'components/FormInputs';
import RecaptchaField from 'components/FormInputs/Recaptcha';

import styles from './styles';

// eslint-disable-next-line
const strongPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const validate = (values) => {
  const errors = {};

  if (!values.password) errors.password = 'PASSWORD_REQUIRED';
  else if (!strongPasswordRegex.test(values.password)) errors.password = 'PASSWORD_WEAK';

  if (!values.passwordConfirmation) errors.passwordConfirmation = 'PASSWORD_CONFIRM';

  if (values.password && values.passwordConfirmation && values.password !== values.passwordConfirmation)
    errors.passwordConfirmation = 'PASSWORDS_DONT_MATCH';

  // if (!values.isCaptchaVerified) errors.isCaptchaVerified = 'CAPTCHA_CONFIRM';

  return errors;
};

class CreatePasswordForm extends Component {
  state = {
    showPassword: false,
  };

  render() {
    const { classes, handleSubmit, isLoading, t } = this.props;

    const passwordHint = (
      <div className={classes.tooltipContainer}>
        <Typography component="p">
          { t('1_LOWER_CASE') }
        </Typography>

        <Typography component="p">
          { t('1_UPPER_CASE') }
        </Typography>

        <Typography component="p">
          { t('1_NUMERIC') }
        </Typography>

        <Typography component="p">
          { t('1_SPECIAL') }
        </Typography>

        <Typography component="p">
          { t('*_LONG') }
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
            label="PASSWORD"
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
            label="PASSWORD_CONFIRMATION"
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
              { t('CREATE_PASSWORD') }&nbsp;
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
  validate,
})(withStyle);
