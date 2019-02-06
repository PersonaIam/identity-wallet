/**
 * Created by vladtomsa on 22/11/2018
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
import { providerConstants } from 'constants/provider';
import { RenderTextField, RenderSelectField } from 'components/FormInputs';
import PassphraseInput from 'components/FormInputs/PassphraseInput';
import AttributesSelection from './AttributesSelection';
import styles from './styles';

const validate = (values) => {
  const errors = {};

  if (!values.name) errors.name = 'SERVICE_NAME_REQUIRED';

  if (!values.description) errors.description = 'SERVICE_DESCRIPTION_REQUIRED';

  if (!values.validations_required) errors.validations_required = 'SERVICE_VALIDATIONS_REQUIRED';

  if (!values.passphrase) errors.passphrase = 'PASSPHRASE_REQUIRED';

  if (!values.attributeTypes) {
    errors.attributeTypes = { _error: 'ATTRIBUTES_REQUIRED' };
  }
  else {
    if (!values.attributeTypes.length) errors.attributeTypes = { _error: 'ATTRIBUTES_REQUIRED' };
  }

  return errors;
};

class ProviderServiceForm extends Component {
  render() {
    const { attributeTypes, classes, handleSubmit, isLoading, onClose, t, } = this.props;

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
                  multiline
                  rows="4"
                  rowsMax="4"
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="validations_required"
                  component={ RenderSelectField }
                  options={[
                    {
                      name: '1',
                      value: 1,
                    },
                    {
                      name: '5',
                      value: 5,
                    },
                    {
                      name: '10',
                      value: 10,
                    },
                    {
                      name: '25',
                      value: 25,
                    },
                    {
                      name: '50',
                      value: 50,
                    },
                  ]}
                  label="VALIDATIONS_REQUIRED"
                  disabled={loading}
                  required
                />

                <Typography variant="body1" className="flex align-center">
                  <span>{ t('ATTRIBUTES_COUNT_RECCOMANDATION') }</span>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <br />
                <FieldArray
                  name="attributeTypes"
                  component={AttributesSelection}
                  attributeTypes={attributeTypes}
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

ProviderServiceForm.propTypes = {
  attributeTypes: PropTypes.array.isRequired,
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
