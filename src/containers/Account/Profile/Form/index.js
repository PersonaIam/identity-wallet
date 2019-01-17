/**
 * Created by vladtomsa on 26/09/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field, FormSection, reduxForm, formValueSelector} from 'redux-form';
import {translate} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
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
import Fade from 'react-reveal/Fade';
import {USER_ROLES} from 'constants/index';
import {RenderTextField, RenderSelectField} from 'components/FormInputs';
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
    const {classes, countries, handleSubmit, initialValues, t, userRoleId} = this.props;

    return (
      <form onSubmit={handleSubmit} noValidate className={classes.form}>
        <div className={classes.modalWrapper}>
          <div>
            <Paper elevation={12}>
              <Paper className={`${classes.header} text-center`}>
                <div className="content">
                  <Typography component="h4">{t('ACCOUNT_DETAILS')}</Typography>

                  <Field
                    name="userRoleId"
                    component={UserRoleToggle}
                    label="BECOME_PERSONA_NOTARY"
                    t={t}
                  />
                </div>
              </Paper>

              <div className={classes.formContent}>
                <Grid container spacing={16} alignItems="center">
                  {
                    userRoleId === USER_ROLES.NOTARY
                      && initialValues.userRoleId !== USER_ROLES.NOTARY
                      ? (
                        <Grid item xs={12}>
                          <Fade>
                            <Typography variant="headline" color="secondary" className="flex align-center">
                              {t('ABOUT_TO_BECOME_NOTARY')}
                            </Typography>
                          </Fade>
                        </Grid>
                      )
                      : null
                  }
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="username"
                      component={RenderTextField}
                      label={t('USERNAME')}
                      disabled
                      disableUnderline
                      startAdornment={
                        <InputAdornment position="start">
                          <Account/>
                        </InputAdornment>
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormSection name="contactInfo">
                      <Field
                        name="email"
                        component={RenderTextField}
                        type="email"
                        disabled
                        disableUnderline
                        label={t('EMAIL')}
                        startAdornment={
                          <InputAdornment position="start">
                            <Email/>
                          </InputAdornment>
                        }
                      />
                    </FormSection>
                  </Grid>

                  <Grid item xs={12}>
                    <br/>
                    <Typography variant="headline" gutterBottom color="textSecondary">
                      {t('CONTACT_INFO')}
                    </Typography>

                    <Divider/>
                    <br/>
                  </Grid>
                </Grid>

                <FormSection name="contactInfo">
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <Field
                        name="firstName"
                        component={RenderTextField}
                        placeholder={t('FIRST_NAME')}
                        required
                        endAdornment={
                          <InputAdornment position="start">
                            <Account/>
                          </InputAdornment>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="lastName"
                        component={RenderTextField}
                        placeholder={t('LAST_NAME')}
                        required
                        endAdornment={
                          <InputAdornment position="start">
                            <Account/>
                          </InputAdornment>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="phoneNumber"
                        component={RenderTextField}
                        placeholder={t('PHONE_NUMBER')}
                        endAdornment={
                          <InputAdornment position="start">
                            <Phone/>
                          </InputAdornment>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="address"
                        component={RenderTextField}
                        placeholder={t('ADDRESS')}
                        multiline
                        rows={3}
                        rowsMax={4}
                        endAdornment={
                          <InputAdornment position="start">
                            <MapMarker/>
                          </InputAdornment>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="city"
                        component={RenderTextField}
                        placeholder={t('CITY')}
                        endAdornment={
                          <InputAdornment position="start">
                            <City/>
                          </InputAdornment>
                        }
                      />
                      <br/>
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="zipCode"
                        component={RenderTextField}
                        placeholder={t('ZIP_CODE')}
                        endAdornment={
                          <InputAdornment position="start">
                            <MapMarkerRadius/>
                          </InputAdornment>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="countryId"
                        component={RenderSelectField}
                        label={t('COUNTRY')}
                        options={countries}
                        endAdornment={
                          <InputAdornment position="end">
                            <Earth style={{marginRight: 8}}/>
                          </InputAdornment>
                        }
                      />
                    </Grid>
                  </Grid>
                </FormSection>
              </div>

              <div className="flex justify-center wrap-content">
                <Button variant="raised" color="primary" type="submit"
                        className={`flex align-center ${classes.submitButton}`}>
                  {t('UPDATE_PROFILE')}
                </Button>
              </div>
              <br/>
            </Paper>
          </div>
        </div>
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
};


const selector = formValueSelector('AccountProfileForm');

const mapStateToProps = (state) => {
  return {
    countries: state.global.countries.map(c => ({name: c.name, value: c.id})),
    userRoleId: selector(state, 'userRoleId'),
  };
};

const withConnect = connect(mapStateToProps)(AccountProfileForm);

const withTranslate = translate('common')(withConnect);

const withStyle = withStyles(styles)(withTranslate);

export default reduxForm({
  form: 'AccountProfileForm',
  validate,
})(withStyle);
