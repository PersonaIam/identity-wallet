/**
 * Created by vladtomsa on 22/11/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
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
import { providerConstants } from 'constants/provider';
import { RenderTextField } from 'components/FormInputs';
import PassphraseInput from 'components/FormInputs/PassphraseInput';

import styles from './styles';

const validate = (values) => {
  const errors = {};

  if (!values.name) errors.name = 'SERVICE_NAME_REQUIRED';

  if (!values.description) errors.description = 'SERVICE_DESCRIPTION_REQUIRED';

  if (!values.passphrase) errors.passphrase = 'PASSPHRASE_REQUIRED';

  return errors;
};

class ProviderServiceForm extends Component {
  render() {
    const { classes, handleSubmit, isLoading, onClose, t, } = this.props;

    const loading = isLoading === providerConstants.ON_CREATE_PROVIDER_SERVICE_INIT;

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
              { t('SERVICE_FORM') }
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Field
                  name="name"
                  component={ RenderTextField }
                  label="SERVICE_NAME"
                  disabled={loading}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="description"
                  component={ RenderTextField }
                  label="SERVICE_DESCRIPTION"
                  disabled={loading}
                  required
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

ProviderServiceForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(ProviderServiceForm);

export default reduxForm({
  form: 'ProviderServiceForm',
  validate,
})(withStyle);
