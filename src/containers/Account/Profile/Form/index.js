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
import City from 'mdi-material-ui/City';
import Earth from 'mdi-material-ui/Earth';
import Email from 'mdi-material-ui/At';
import MapMarker from 'mdi-material-ui/MapMarker';
import MapMarkerRadius from 'mdi-material-ui/MapMarkerRadius';
import Phone from 'mdi-material-ui/Phone';
import Zoom from 'react-reveal/Zoom';
import { USER_ROLES } from 'constants/index';
import { RenderTextField, RenderSelectField } from 'components/FormInputs';
import UserRoleToggle from './UserRoleToggle';

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

    if (values.userRoleId === USER_ROLES.NOTARY) {
      if (!values.contactInfo.firstName) {
        errors.contactInfo.firstName = 'FIRST_NAME_REQUIRED';
      }

      if (!values.contactInfo.lastName) {
        errors.contactInfo.lastName = 'LAST_NAME_REQUIRED';
      }

      if (!values.contactInfo.address) {
        errors.contactInfo.address = 'ADDRESS_REQUIRED';
      }

      if (!values.contactInfo.city) {
        errors.contactInfo.city = 'CITY_REQUIRED';
      }

      if (!values.contactInfo.zipCode) {
        errors.contactInfo.zipCode = 'ZIP_CODE_REQUIRED';
      }

      if (!values.contactInfo.countryId) {
        errors.contactInfo.countryId = 'COUNTRY_REQUIRED';
      }
    }
  }
  else {
    errors.contactInfo.email = 'EMAIL_REQUIRED';
  }

  if (!values.isCaptchaVerified) errors.isCaptchaVerified = 'CAPTCHA_CONFIRM';

  return errors;
};

class AccountProfileForm extends Component {
  render() {
    const { classes, countries, handleSubmit, t, width } = this.props;

    const isSmallDevice = width === 'xs';

    const shouldRotate = !isSmallDevice;

    const contactInfoSection = (
      <div
        className={classes.modalWrapper}
        style={ shouldRotate ? { transform: 'rotate(1deg)' } : {} }
      >
        <div>
          <Paper elevation={12}>
            <Paper className={`${classes.header} ${classes.contactHeader} text-center`}>
              <div className="content">
                <Typography component="h4">{ t('CONTACT_INFO') }</Typography>
              </div>
            </Paper>

            <FormSection name="contactInfo">
              <div className={classes.formContent}>
                <Field
                  name="firstName"
                  component={ RenderTextField }
                  placeholder={t('FIRST_NAME')}
                  required
                  endAdornment={
                    <InputAdornment position="start">
                      <Account />
                    </InputAdornment>
                  }
                />
                <br />
                <br />
                <Field
                  name="lastName"
                  component={ RenderTextField }
                  placeholder={t('LAST_NAME')}
                  required
                  endAdornment={
                    <InputAdornment position="start">
                      <Account />
                    </InputAdornment>
                  }
                />
                <br />
                <br />
                <Field
                  name="phoneNumber"
                  component={ RenderTextField }
                  placeholder={t('PHONE_NUMBER')}
                  endAdornment={
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  }
                />
                <br />
                <br />
                <Field
                  name="address"
                  component={ RenderTextField }
                  placeholder={t('ADDRESS')}
                  multiline
                  rows={3}
                  rowsMax={4}
                  endAdornment={
                    <InputAdornment position="start">
                      <MapMarker />
                    </InputAdornment>
                  }
                />

                <br />
                <br />
                <Field
                  name="city"
                  component={ RenderTextField }
                  placeholder={t('CITY')}
                  endAdornment={
                    <InputAdornment position="start">
                      <City />
                    </InputAdornment>
                  }
                />
                <br />
                <br />
                <Field
                  name="zipCode"
                  component={ RenderTextField }
                  placeholder={t('ZIP_CODE')}
                  endAdornment={
                    <InputAdornment position="start">
                      <MapMarkerRadius />
                    </InputAdornment>
                  }
                />
                <br />
                <br />
                <Field
                  name="countryId"
                  component={ RenderSelectField }
                  label={t('COUNTRY')}
                  options={countries}
                  endAdornment={
                    <InputAdornment position="end">
                      <Earth style={{ marginRight: 8 }} />
                    </InputAdornment>
                  }
                />
              </div>
            </FormSection>

            <br />
          </Paper>
        </div>
      </div>
    );

    return (
      <form onSubmit={handleSubmit} noValidate className={classes.form}>
        <Grid container justify="center" spacing={16}>
          <Grid item xs={12} sm={6} lg={5}>
            <div
              className={classes.modalWrapper}
              style={ shouldRotate ? { transform: 'rotate(-1deg)' } : {} }
            >
              <div>
                <Paper elevation={12}>
                  <Paper className={`${classes.header} text-center`}>
                    <div className="content">
                      <Typography component="h4">{ t('ACCOUNT_DETAILS') }</Typography>
                    </div>
                  </Paper>

                  <div className={classes.formContent}>
                    <Field
                      name="username"
                      component={ RenderTextField }
                      label={t('USERNAME')}
                      disabled
                      disableUnderline
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
                        disabled
                        disableUnderline
                        label={t('EMAIL')}
                        startAdornment={
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        }
                      />
                    </FormSection>
                    <br />
                    <br />
                    <Field
                      name="userRoleId"
                      component={ UserRoleToggle }
                      label="BECOME_PERSONA_NOTARY"
                      t={t}
                    />

                    <br />

                    {
                      isSmallDevice
                        ? (
                          <div>
                            <br />
                            <br />
                            <br />
                            <Zoom top>
                              { contactInfoSection }
                            </Zoom>

                            <br />
                            <br />
                          </div>
                        )
                        : null
                    }

                  </div>

                  <div className="flex justify-center wrap-content">
                    <Button variant="raised" color="primary" type="submit" className={`flex align-center ${classes.submitButton}`}>
                      { t('UPDATE_PROFILE') }
                    </Button>
                  </div>
                  <br />
                </Paper>
              </div>
            </div>
          </Grid>

          {
            !isSmallDevice
              ? (
                <Grid item xs={12} sm={6} lg={5}>
                  <Zoom top>
                    { contactInfoSection }
                  </Zoom>
                </Grid>
              )
              : null
          }
        </Grid>
      </form>
    );
  }
}

AccountProfileForm.propTypes = {
  classes: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userRoleId: PropTypes.any,
  width: PropTypes.string.isRequired,
};


const selector = formValueSelector('AccountProfileForm');

const mapStateToProps = (state) => {
  return {
    countries: state.global.countries.map(c => ({ name: c.name, value: c.id })),
    userRoleId: selector(state, 'userRoleId'),
  };
};

const withConnect = connect(mapStateToProps)(AccountProfileForm);

const withTranslate = translate('common')(withConnect);

const withStyle = withStyles(styles)(withTranslate);

const withable = withWidth()(withStyle);

export default reduxForm({
  form: 'AccountProfileForm',
  validate,
})(withable);
