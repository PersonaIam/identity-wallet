/**
 * Created by vladtomsa on 08/10/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {translate} from 'react-i18next';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Zoom from '@material-ui/core/Zoom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PassphraseInput from 'components/FormInputs/PassphraseInput';
import {AVAILABLE_DATA_TYPES, getFormFields, validateField} from 'helpers/getFormFieldsFromJSONConfig';
import AttributeAssociations from './AttributeAssociations';

const validate = (values, props) => {
  const {uiSchema} = props;

  const errors = validateField(uiSchema, values);

  if (!values.passphrase) {
    errors.passphrase = 'PASSPHRASE_REQUIRED';
  }

  if (
    isAssociationsAvailable(uiSchema)
      && !(values.associations && values.associations.length)
  ) {
    errors.associations = { _error: 'ATTRIBUTE_ASOCIATIONS_REQUIRED' };
  }

  return errors;
};

const isAssociationsAvailable = (uiSchema) => {
  return uiSchema.data_type === AVAILABLE_DATA_TYPES.FILE;
};

class IdentityForm extends Component {
  render() {
    const {handleSubmit, onClose, t, uiSchema, createdAttributes} = this.props;

    const {name} = uiSchema;

    return (
      <Dialog
        PaperComponent="form"
        TransitionComponent={Zoom}
        maxWidth="md"
        open={true}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
          <DialogTitle>{t('IDENTITY')} - {t(name)}</DialogTitle>

          <DialogContent style={{width: 500, maxWidth: '100%'}}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                {getFormFields(uiSchema)}
              </Grid>

              {
                isAssociationsAvailable(uiSchema)
                  ? (
                    <Grid item xs={12}>
                      <br />
                      <br />
                      <FieldArray
                        name="associations"
                        component={AttributeAssociations}
                        createdAttributes={createdAttributes}
                        t={t}
                      />
                      <br />
                      <br />
                      <br />
                    </Grid>
                  )
                  : null
              }

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
            <Button onClick={onClose} color="primary">
              {t('CANCEL')}
            </Button>
            <Button type="submit" color="primary" variant="outlined">
              {t('SAVE')}
            </Button>
          </DialogActions>
      </Dialog>
    );
  }

}

IdentityForm.propTypes = {
  createdAttributes: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  uiSchema: PropTypes.object.isRequired,
};

const withTranslate = translate('common')(IdentityForm);

export default reduxForm({
  form: 'IdentityForm',
  validate,
})(withTranslate);
