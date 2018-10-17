/**
 * Created by vladtomsa on 08/10/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {translate} from 'react-i18next';
import {getFormFields, validateField} from 'helpers/getFormFieldsFromJSONConfig';


import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Zoom from '@material-ui/core/Zoom';


import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PassphraseInput from 'components/FormInputs/PassphraseInput';

const validate = (values, props) => {
  const { uiSchema } = props;

  let errors = {};

  errors = validateField(uiSchema, values);

  if (!values.passphrase) {
    errors.passphrase = 'PASSPHRASE_REQUIRED';
  }

  return errors;
};

class IdentityForm extends Component {
  render() {
    const {handleSubmit, onClose, t, uiSchema} = this.props;

    const {name} = uiSchema;

    return (
      <Dialog
        maxWidth="md"
        open={true}
        onClose={onClose}
        TransitionComponent={Zoom}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{t('IDENTITY')} - {t(name)}</DialogTitle>

          <DialogContent style={{width: 500, maxWidth: '100%'}}>
           <Grid container spacing={16}>
              <Grid item xs={12}>
                {getFormFields(uiSchema)}
              </Grid>

              <Grid item xs={12}>
                <Field
                  name="passphrase"
                  label="PASSPHRASE"
                  type="password"
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
            <Button type="submit" color="secondary">
              {t('SAVE')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }

}

IdentityForm.propTypes = {
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
