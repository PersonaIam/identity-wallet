/**
 * Created by vladtomsa on 26/09/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Account from 'mdi-material-ui/Account';
import Email from 'mdi-material-ui/At';
import { RenderTextField } from 'components/FormInputs';
import RecaptchaField from 'components/FormInputs/Recaptcha';

import styles from './styles';

const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

const validate = (values) => {
  const errors = {};

  if (!values.username) errors.username = 'USERNAME_REQUIRED';

  if (!values.email) {
    errors.email = 'EMAIL_REQUIRED';
  } else if (
    !emailRegex.test(values.email)
  ) {
    errors.email = 'INVALID_EMAIL';
  }

  if (!values.isCaptchaVerified) errors.isCaptchaVerified = 'CAPTCHA_CONFIRM';

  return errors;
};

class RegisterForm extends Component {
  render() {
    const { classes, handleSubmit, t } = this.props;

    return (
      <form className={classes.modalWrapper} onSubmit={handleSubmit}>
        <div>
          <Paper elevation={12}>
            <Paper className={`${classes.header} text-center`}>
              <div className="content">
                <Typography component="h4">{ t('REGISTER') }</Typography>
              </div>
            </Paper>

            <div className={classes.formContent}>
              <Field
                name="username"
                component={ RenderTextField }
                placeholder={t('USERNAME')}
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
                name="email"
                component={ RenderTextField }
                type="email"
                placeholder={t('EMAIL')}
                required
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
              <br />
              <br />
              <br />

              <div className="flex justify-center">
                <Field
                  name="isCaptchaVerified"
                  component={ RecaptchaField }
                />
              </div>

            </div>

            <div className="flex justify-center wrap-content">
              <Button variant="raised" color="primary" type="submit" className={`flex align-center ${classes.submitButton}`}>
                { t('REGISTER') }
              </Button>
            </div>
            <br />
          </Paper>
        </div>
      </form>
    )
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withTranslate = translate('common')(RegisterForm);

const withStyle = withStyles(styles)(withTranslate);

export default reduxForm({
  form: 'RegisterForm',
  validate,
})(withStyle);
