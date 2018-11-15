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
import { RenderSelectField, RenderTextField } from 'components/FormInputs/index';
import { VALIDATION_REQUEST_ACTION, VALIDATION_TYPE } from 'constants/index';


const validate = (values, { actionType }) => {
  const {
    // APPROVE,
    NOTARIZE,
    DECLINE,
    REJECT,
  } = VALIDATION_REQUEST_ACTION;

  const errors = {
    asset: {},
  };

  if (!values.passphrase) {
    errors.passphrase = 'PASSPHRASE_REQUIRED';
  }

  if (
    actionType === NOTARIZE
    //|| actionType === APPROVE
  ) {
    const assetValidationErrors = [];

    values.asset.validation.forEach((validation, index) => {
      const validationError = {};

      if (!validation.validationType) {
        validationError.validationType = 'VALIDATION_TYPE_REQUIRED';
      }

      assetValidationErrors[index] = validationError;
    });

    if (assetValidationErrors.length) {
      errors.asset.validation = assetValidationErrors;
    }
  }

  if (actionType === REJECT || actionType === DECLINE) {
    const assetValidationErrors = [];

    values.asset.validation.forEach((validation, index) => {
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
      errors.asset.validation = assetValidationErrors;
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
                actionType === VALIDATION_REQUEST_ACTION.NOTARIZE
                // || actionType === VALIDATION_REQUEST_ACTION.APPROVE
                  ? (
                    <Field
                      name={`${member}.validationType`}
                      label="VALIDATION_TYPE"
                      component={RenderSelectField}
                      disabled={!!disabled}
                      options={
                        Object.keys(VALIDATION_TYPE)
                          .map((key) => {
                            return {
                              name: key,
                              value: VALIDATION_TYPE[key],
                            };
                          })
                      }
                    />
                  )
                  : null
              }

              {
                actionType === VALIDATION_REQUEST_ACTION.DECLINE
                || actionType === VALIDATION_REQUEST_ACTION.REJECT
                  ? (
                    <Field
                      name={`${member}.reason`}
                      label="REASON"
                      disabled={!!disabled}
                      component={RenderTextField}
                      rows={2}
                      maxLength={1024}
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

class ValidationActionForm extends Component {
  render() {
    const {actionType, handleSubmit, isLoading, onClose, t} = this.props;

    const title = Object.keys(VALIDATION_REQUEST_ACTION).find(key => VALIDATION_REQUEST_ACTION[key] === actionType);

    return (
      <Dialog
        maxWidth="md"
        open={true}
        onClose={onClose}
        TransitionComponent={Zoom}
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
              actionType === VALIDATION_REQUEST_ACTION.NOTARIZE
              // || actionType === VALIDATION_REQUEST_ACTION.APPROVE
              || actionType === VALIDATION_REQUEST_ACTION.REJECT
              || actionType === VALIDATION_REQUEST_ACTION.DECLINE
                ? (
                  <Grid item xs={12}>
                    <FormSection name="asset">
                      <FieldArray
                        name="validation"
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
          <Button onClick={handleSubmit} color="primary" variant="outlined" disabled={isLoading}>
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

ValidationActionForm.propTypes = {
  actionType: PropTypes.any.isRequired,
  isLoading: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'ValidationActionForm',
  validate,
})(ValidationActionForm);
