/**
 * Created by vladtomsa on 26/09/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection, reduxForm, formValueSelector } from 'redux-form';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Account from 'mdi-material-ui/Account';
import Email from 'mdi-material-ui/At';
import { USER_ROLES } from 'constants/index';
import { RenderTextField } from 'components/FormInputs';
import RecaptchaField from 'components/FormInputs/Recaptcha';

import styles from './styles';

const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

const validate = (values) => {
  const errors = {
    contactInfo: {},
  };

  if (!values.username) errors.username = 'USERNAME_REQUIRED';

  if (values.contactInfo) {
    if (!values.contactInfo.email) {
      errors.contactInfo.email = 'EMAIL_REQUIRED';
    } else if (
      !emailRegex.test(values.contactInfo.email)
    ) {
      errors.contactInfo.email = 'INVALID_EMAIL';
    }
  }
  else {
    errors.contactInfo.email = 'EMAIL_REQUIRED';
  }

  if (!values.isCaptchaVerified) errors.isCaptchaVerified = 'CAPTCHA_CONFIRM';

  return errors;
};

class RegisterForm extends Component {
  render() {
    const { classes, handleSubmit, t, userRoleId, width } = this.props;

    const isSmallDevice = width === 'xs';

    const shouldRotate = userRoleId === USER_ROLES.NOTARY && !isSmallDevice;

    return (
      <form onSubmit={handleSubmit} noValidate>
        <Grid container justify="center" spacing={16}>
          <Grid item xs={11} sm={6} md={5} lg={4}>
            <div
              className={classes.modalWrapper}
              style={ shouldRotate ? { transform: 'rotate(-1deg)' } : {} }
            >
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
                    <FormSection name="contactInfo">
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
                    </FormSection>

                    <br />
                    <br />

                    <div>
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
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userRoleId: PropTypes.any,
  width: PropTypes.string.isRequired,
};


const selector = formValueSelector('RegisterForm');

const mapStateToProps = (state) => {
  return {
    countries: state.global.countries.map(c => ({ name: c.name, value: c.id })),
    userRoleId: selector(state, 'userRoleId'),
  };
};

const withConnect = connect(mapStateToProps)(RegisterForm);

const withTranslate = translate('common')(withConnect);

const withStyle = withStyles(styles)(withTranslate);

const withable = withWidth()(withStyle);

export default reduxForm({
  form: 'RegisterForm',
  validate,
})(withable);
