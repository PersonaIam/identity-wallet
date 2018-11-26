/**
 * Created by vladtomsa on 26/09/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Account from 'mdi-material-ui/Account';
import Email from 'mdi-material-ui/At';
import { RenderTextField, RenderCheckbox } from 'components/FormInputs';
import RecaptchaField from 'components/FormInputs/Recaptcha';

const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

const validate = (values) => {
  const errors = {
    contactInfo: {},
  };

  if (!values.firstName) errors.firstName = 'FIRST_NAME_REQUIRED';

  if (!values.firstName) errors.lastName = 'LAST_NAME_REQUIRED';

  if (!values.email) {
    errors.email = 'EMAIL_REQUIRED';
  } else if (
    !emailRegex.test(values.email)
  ) {
    errors.email = 'INVALID_EMAIL';
  }

  if (!values.isCaptchaVerified) errors.isCaptchaVerified = 'CAPTCHA_CONFIRM';

  // if (!values.readPrivacyPolicy) errors.readPrivacyPolicy = 'AGREE_PRIVACY';

  return errors;
};

class PreRegisterForm extends Component {
  render() {
    const { handleSubmit, isLoading, t } = this.props;

    return (
      <form onSubmit={handleSubmit} noValidate>
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item xs={11}>
            <Field
              name="firstName"
              component={ RenderTextField }
              placeholder={t('FIRST_NAME')}
              required
              disabled={isLoading}
              startAdornment={
                <InputAdornment position="start">
                  <Account />
                </InputAdornment>
              }
            />
          </Grid>

          <Grid item xs={11}>
            <Field
              name="lastName"
              component={ RenderTextField }
              placeholder={t('LAST_NAME')}
              required
              disabled={isLoading}
              startAdornment={
                <InputAdornment position="start">
                  <Account />
                </InputAdornment>
              }
            />
          </Grid>

          <Grid item xs={11}>
            <Field
              name="email"
              component={ RenderTextField }
              type="email"
              placeholder={t('EMAIL')}
              required
              disabled={isLoading}
              startAdornment={
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              }
            />
          </Grid>

          {/*<Grid item xs={11} md={6}>*/}
            {/*<Field*/}
              {/*name="readPrivacyPolicy"*/}
              {/*component={ RenderCheckbox }*/}
              {/*label="PRIVACY_CONFIRM"*/}
            {/*/>*/}
          {/*</Grid>*/}

          <Grid item xs={11}>
            <Field
              name="isCaptchaVerified"
              component={ RecaptchaField }
            />
          </Grid>

          <Grid item xs={11}>
            <div className="flex justify-center">
              <div>
                <Button
                  type="submit"
                  className="flex align-center"
                  disabled={isLoading}
                  variant="outlined"
                >
                  &nbsp;{t('SUBMIT')}&nbsp;
                  {
                    isLoading
                      ? <CircularProgress size={20}/>
                      : null
                  }
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

PreRegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'PreRegisterForm',
  validate,
})(PreRegisterForm);
