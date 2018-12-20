/**
 * Created by vladtomsa on 22/11/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FormSection, reduxForm, formValueSelector } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Account from 'mdi-material-ui/Account';
import Email from 'mdi-material-ui/At';
import { administrationsConstants } from 'constants/administration';
import { RenderTextField } from 'components/FormInputs';

import styles from './styles';

const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

const validate = (values) => {
  const errors = {
    contactInfo: {},
  };

  if (!values.username) errors.username = 'USERNAME_REQUIRED';

  if (values.contactInfo) {
    if (!values.contactInfo.firstName) {
      errors.contactInfo.firstName = 'FIRST_NAME_REQUIRED';
    }

    if (!values.contactInfo.lastName) {
      errors.contactInfo.lastName = 'LAST_NAME_REQUIRED';
    }

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

  return errors;
};

class AdminProviderForm extends Component {
  render() {
    const { classes, handleSubmit, initialValues, isLoading, onClose, t, } = this.props;

    const loading = isLoading === administrationsConstants.ON_SAVE_ADMIN_PROVIDERS_INIT;

    return (
      <Dialog
        open={true}
        onClose={onClose}
        classes={{ paper: classes.root }}
      >
        <form onSubmit={handleSubmit} noValidate>
          {
            loading
              ? <LinearProgress />
              : null
          }
          <DialogTitle>
            <Typography variant="title" component="span">
              { t('PROVIDER_FORM') }
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Field
                  name="username"
                  component={ RenderTextField }
                  placeholder={t('USERNAME')}
                  disabled={loading || !!initialValues.username}
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <Account />
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>

              <FormSection name="contactInfo">
                <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Field
                    name="firstName"
                    component={ RenderTextField }
                    placeholder={t('FIRST_NAME')}
                    disabled={loading || !!initialValues.username}
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <Account />
                      </InputAdornment>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="lastName"
                    component={ RenderTextField }
                    placeholder={t('LAST_NAME')}
                    disabled={loading || !!initialValues.username}
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <Account />
                      </InputAdornment>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="email"
                    component={ RenderTextField }
                    type="email"
                    placeholder={t('EMAIL')}
                    disabled={loading || !!(initialValues.contactInfo && initialValues.contactInfo.email)}
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    }
                  />
                </Grid>
                </Grid>
              </FormSection>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>
              {t('CANCEL')}
            </Button>

            <Button
              type="submit"
              className="flex align-center"
              disabled={loading}
              variant="outlined"
              color="primary"
            >
              &nbsp;{t('SUBMIT')}&nbsp;
              {
                loading
                  ? <CircularProgress size={20}/>
                  : null
              }
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

AdminProviderForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userRoleId: PropTypes.any,
};


const selector = formValueSelector('AdminProviderForm');

const mapStateToProps = (state) => {
  return {
    userRoleId: selector(state, 'userRoleId'),
  };
};

const withConnect = connect(mapStateToProps)(AdminProviderForm);

const withStyle = withStyles(styles)(withConnect);

export default reduxForm({
  form: 'AdminProviderForm',
  validate,
})(withStyle);
