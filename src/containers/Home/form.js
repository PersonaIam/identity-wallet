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
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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

  if (!values.readPrivacyPolicy) errors.readPrivacyPolicy = 'AGREE_PRIVACY';

  return errors;
};

class PreRegisterForm extends Component {
  render() {
    const { handleSubmit, isLoading, t, readPrivacyPolicy } = this.props;

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

          <Grid item xs={11}>
            <Typography variant="display1" style={{ paddingLeft: 0 }}>
              Contact permission
            </Typography>
            <Divider style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}/>
            <br />

            <Typography variant="subheading">
              We want to send you a notification once Persona is up and running and you can register in order to create
              your Persona Identity and start enjoying all its benefits.
            </Typography>

            <Typography variant="subheading">
              We'll always treat your personal details with the utmost care and will never sell them to other companies
              for marketing purposes. Please send us an email at&nbsp;
              <a href="mailto:hello@persona.im">hello@persona.im</a>&nbsp;
              in case you want your personal details to be removed from our database.
            </Typography>

            <Grid item xs={11} md={6}>
              <Field
                name="readPrivacyPolicy"
                component={ RenderCheckbox }
                label="Yes please, I'd like to hear about Persona launch "
              />
            </Grid>

            <br />
            <br />
          </Grid>

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
                  disabled={isLoading || !readPrivacyPolicy}
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
