/**
 * Created by vladtomsa on 08/10/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PassphraseInput from 'components/FormInputs/PassphraseInput';

const validate = (values, props) => {
  const errors = {};

  if (!values.passphrase) {
    errors.passphrase = 'Passphrase is required';
  }

  return errors;
};

class IdentityForm extends Component {
  render() {
    const {handleSubmit, onClose, t} = this.props;

    return (

      <Dialog
        maxWidth="md"
        open={true}
        onClose={onClose}
        onSubmit={handleSubmit}
        PaperComponent="form"
        TransitionComponent={Zoom}
      >
        <DialogTitle>{t('PROVIDE_PASSPHRASE')}</DialogTitle>

        <DialogContent style={{width: 500, maxWidth: '100%'}}>
          <DialogContentText>
            {t('PROVIDE_PASSPHRASE_TO_DECRYPT')}
          </DialogContentText>

          <Grid container spacing={16}>
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
          <Button type="submit" color="primary" variant="outlined">
            {t('SUBMIT')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}

IdentityForm.propTypes = {
  handleSubmit: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'IdentityForm',
  validate,
})(IdentityForm);
