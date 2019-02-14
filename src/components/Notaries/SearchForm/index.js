/**
 * Created by vladtomsa on 09/11/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LocationSelector from 'components/FormInputs/LocationSelector';

const validate = (values) => {
  const errors = {};

  if (!values.lat) {
    errors.lat = 'LATITUDE_REQUIRED';
  }
  else {
    if (values.lat < -90) {
      errors.lat = 'INVALID_LATITUDE';
    }

    if (values.lat > 90) {
      errors.lat = 'INVALID_LATITUDE';
    }
  }

  if (!values.lng) {
    errors.lng = 'LONGITUDE_REQUIRED';
  }
  else {
    if (values.lng < -180) {
      errors.lng = 'INVALID_LONGITUDE';
    }

    if (values.lng > 180) {
      errors.lng = 'INVALID_LONGITUDE';
    }
  }

  return errors;
};

const NotariesSerchForm = ({handleSubmit, t}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Paper>
            <Field
              name="location"
              component={LocationSelector}
              t={t}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <br />
          <div className="flex justify-end">
            <Button type="submit" variant="contained" color="primary">{ t('FIND_NOTARIES') }</Button>
          </div>
        </Grid>
      </Grid>
    </form>
  )
};

NotariesSerchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'NotariesSearchForm',
  validate,
})(NotariesSerchForm);
