/**
 * Created by vladtomsa on 12/11/2018
 */
/**
 * Created by vladtomsa on 08/10/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PassphraseInput from 'components/FormInputs/PassphraseInput';

const validate = (values) => {
  const errors = {};

  if (!values.passphrase) {
    errors.passphrase = 'PASSPHRASE_REQUIRED';
  }

  return errors;
};


class AttributeValidationCreateForm extends Component {
  render() {
    const {handleSubmit, onClose, t, text} = this.props;


    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textSecondary">
              { text }
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Field
              name="secret"
              label="PASSPHRASE"
              type="password"
              autoComplete="new-password"
              component={PassphraseInput}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <div className="flex justify-end">
              <Button onClick={onClose} color="primary">
                {t('CANCEL')}
              </Button>
              &nbsp;
              <Button onClick={handleSubmit} color="primary" variant="outlined">
                {t('SUBMIT')}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }

}

AttributeValidationCreateForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'AttributeValidationCreateForm',
  validate,
})(AttributeValidationCreateForm);
