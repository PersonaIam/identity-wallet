/**
 * Created by vladtomsa on 08/10/2018
 */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field, FieldArray, FormSection, reduxForm} from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Zoom from '@material-ui/core/Zoom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PassphraseInput from 'components/FormInputs/PassphraseInput';
import { RenderTextField } from 'components/FormInputs/index';
import { IDENTITY_USE_REQUEST_ACTION } from 'constants/index';

const validate = (values, { actionType }) => {
  const {
    END,
  } = IDENTITY_USE_REQUEST_ACTION;

  const errors = {
    asset: {},
  };

  if (!values.passphrase) {
    errors.passphrase = 'PASSPHRASE_REQUIRED';
  }

  if (actionType === END) {
    const assetValidationErrors = [];

    values.asset.identityuse.forEach((validation, index) => {
      const validationError = {};

      if (!validation.reason) {
        validationError.reason = 'REASON_REQUIRED';
      }
      else if (validation.reason.length > 1024) {
        validationError.reason = 'REASON_I_TO_LARGE';
      }

      assetValidationErrors[index] = validationError;
    });

    if (assetValidationErrors.length) {
      errors.asset.identityuse = assetValidationErrors;
    }
  }

  return errors;
};

const renderValidationFieldArray = ({ fields, actionType, disabled }) => {
  return (
    <div>
      {
        fields.map((member, index) => {
          return (
            <Fragment key={index}>
              {
                actionType === IDENTITY_USE_REQUEST_ACTION.END
                  ? (
                    <Field
                      name={`${member}.reason`}
                      label="REASON"
                      disabled={!!disabled}
                      component={RenderTextField}
                      rows={2}
                      maxLength={1024}
                      required={true}
                    />
                  )
                  : null
              }
            </Fragment>
          )
        })
      }
    </div>
  );
};

class IdentityUseActionForm extends Component {
  render() {
    const {actionType, handleSubmit, isLoading, onClose, t} = this.props;

    const title = Object.keys(IDENTITY_USE_REQUEST_ACTION).find(key => IDENTITY_USE_REQUEST_ACTION[key] === actionType);

    return (
      <Dialog
        maxWidth="md"
        open={true}
        onClose={onClose}
        TransitionComponent={Zoom}
        PaperComponent="form"
        onSubmit={handleSubmit}
        noValidate
      >
        {
          isLoading
            ? (<LinearProgress variant="indeterminate"/>)
            : null
        }

        <DialogTitle>{t(title)}</DialogTitle>

        <DialogContent style={{width: 500, maxWidth: '100%'}}>
          <Grid container spacing={16}>
            {
              actionType === IDENTITY_USE_REQUEST_ACTION.END
                ? (
                  <Grid item xs={12}>
                    <FormSection name="asset">
                      <FieldArray
                        name="identityuse"
                        disabled={!!isLoading}
                        component={renderValidationFieldArray}
                        actionType={actionType}
                      />
                    </FormSection>
                  </Grid>
                )
                : null
            }

            <Grid item xs={12}>
              <Field
                name="secret"
                label="PASSPHRASE"
                type="password"
                disabled={!!isLoading}
                autoComplete="new-password"
                component={PassphraseInput}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary" disabled={isLoading}>
            {t('CANCEL')}
          </Button>
          <Button type="submit" color="primary" variant="outlined" disabled={isLoading}>
            {t('SUBMIT')}
            {
              isLoading
                ? <CircularProgress size={12}/>
                : null
            }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}

IdentityUseActionForm.propTypes = {
  actionType: PropTypes.any.isRequired,
  isLoading: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'IdentityUseActionForm',
  validate,
})(IdentityUseActionForm);
