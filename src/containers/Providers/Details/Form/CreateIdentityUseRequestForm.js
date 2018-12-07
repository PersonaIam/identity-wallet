/**
 * Created by vladtomsa on 03/12/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';


import Typography from '@material-ui/core/Typography';
import { identityUseConstants } from 'constants/identityUse';
import PassphraseInput from 'components/FormInputs/PassphraseInput';

import styles from './styles';
import AttributesSelection from "./AttributesSelection";

const validate = (values) => {
  const errors = {};

  if (!values.attributes) {
    errors.attributes = { _error: 'ATTRIBUTES_REQUIRED' };
  }
  else {
    if (!values.attributes.length) errors.attributes = { _error: 'ATTRIBUTES_REQUIRED' };
  }

  if (!values.passphrase) errors.passphrase = 'PASSPHRASE_REQUIRED';

  return errors;
};

class CreateIdentityUseRequestForm extends Component {
  render() {
    const { classes, handleSubmit, isLoading, onClose, serviceInfo, t, userAttributes } = this.props;

    const loading = isLoading === `${identityUseConstants.CREATE_IDENTITY_USE_REQUEST_INIT}_${serviceInfo.id}`;

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
              { t('REQUEST_SERVICE') }
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <FieldArray
                  name="attributes"
                  component={AttributesSelection}
                  attributes={userAttributes}
                  t={t}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="passphrase"
                  label="PASSPHRASE"
                  type="password"
                  autoComplete="new-password"
                  component={PassphraseInput}
                  required
                />
              </Grid>
            </Grid>
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

CreateIdentityUseRequestForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  serviceInfo: PropTypes.object.isRequired,
  userAttributes: PropTypes.any,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(CreateIdentityUseRequestForm);

export default reduxForm({
  form: 'CreateIdentityUseRequestForm',
  validate,
})(withStyle);
