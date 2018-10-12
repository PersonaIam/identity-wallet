/**
 * Created by vladtomsa on 08/10/2018
 */
import React from 'react';
import { Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { RenderSelectField } from 'components/FormInputs';

import moment from 'moment';

const MAX_AGE = 100;

const getDayOptions = () => {
  const dayOptions = [];

  for (let i = 1; i <= 31; i ++) {
    dayOptions.push({
      name: i,
      value: i,
    });
  }

  return dayOptions;
};

const getMonthOptions = () => {
  const monthOptions = [];

  for (let i = 0; i <= 11; i ++) {
    monthOptions.push({
      name: moment().set('month', i).format('MMMM'),
      value: i + 1,
    });
  }

  return monthOptions;
};

const getYearOptions = () => {
  const years = [];

  const currentYear = moment().get('year');
  const startYear = moment().set('year', currentYear - MAX_AGE).get('year');

  for (let year = startYear; year <= currentYear; year++) {
    years.unshift({ value: year, name: year });
  }

  return years;
};

const BirthDayInput = (props) => {
  const { isLoading, t } = props;

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography variant="subheading">{t('Birthday')}</Typography>
      </Grid>

      <Grid item xs={4}>
        <Field
          name="day"
          component={ RenderSelectField }
          label="DAY"
          disabled={isLoading}
          required
          options={getDayOptions()}
          hideNoneOption
        />
      </Grid>

      <Grid item xs={4}>
        <Field
          name="month"
          component={ RenderSelectField }
          label="MONTH"
          disabled={isLoading}
          required
          options={getMonthOptions()}
          hideNoneOption
        />
      </Grid>

      <Grid item xs={4}>
        <Field
          name="year"
          component={ RenderSelectField }
          label="YEAR"
          disabled={isLoading}
          required
          options={getYearOptions()}
          hideNoneOption
        />
      </Grid>
    </Grid>
  )
};

export default BirthDayInput;
