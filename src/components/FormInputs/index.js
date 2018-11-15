import React, { Component } from 'react';
// import Loadable from 'react-loadable';
// import Loading from 'components/Loading';

import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CalendarIcon from 'mdi-material-ui/Calendar';
// import ClockIcon from 'mdi-material-ui/Clock';
import LeftIcon from 'mdi-material-ui/ChevronLeft';
import RightIcon from 'mdi-material-ui/ChevronRight';

import {
  DatePicker,
  // TimePicker,
  // DateTimePicker,
} from 'material-ui-pickers';

import {
  DATE_FORMAT,
  // DATE_TIME_FORMAT,
} from 'constants';

import {withStyles} from '@material-ui/core/styles';
import {translate} from 'react-i18next';

export const RenderTextField = translate('common')((props) => {
  const { input, label, meta: { touched, error }, displayErrorWhenNotTouched, required, i18n, t, tReady, ...custom} = props;

  const inputProps = { required: !!required };

  if (custom.minLength) inputProps.maxLength = custom.minLength;
  if (custom.maxLength) inputProps.maxLength = custom.maxLength;
  if (custom.min) inputProps.max = custom.min;
  if (custom.max) inputProps.max = custom.max;

  return (
    <FormControl required={!!required} error={!!((touched || displayErrorWhenNotTouched) && error)} fullWidth>
      {
        label ? <InputLabel required={required}>{t(label)}</InputLabel> : null
      }
      <Input
        { ...input } { ...custom } inputProps={inputProps}
      />
      { !!((touched || displayErrorWhenNotTouched) && error) ? <FormHelperText>{ t(error) }</FormHelperText> : null }
    </FormControl>
  );
});

const styles = {
  selectContainer: {
    maxHeight: 300,
  },
};

export const RenderSelectField = withStyles(styles)(translate('common')(class extends Component {
      state = {
        searchTerm: '',
      };

      render() {
        const {input, label, meta, required, options, disabled, displayErrorWhenNotTouched, t, tReady, classes, hideNoneOption, ...custom} = this.props;
        const {touched, error} = meta;

        return (
          <FormControl disabled={disabled} error={!!((touched || displayErrorWhenNotTouched) && error)} fullWidth>
            <InputLabel required={required}>{t(label)}</InputLabel>
            <Select
              {...input}
              {...custom}
              MenuProps={{
                onEnter: () => {
                  setTimeout(() => {
                    if (document.activeElement) {
                      document.activeElement.blur();
                    }
                  }, 500);
                },
              }}
            >
              {
                hideNoneOption
                  ? null
                  : (
                    <MenuItem value="">
                      <em>{t('None')}</em>
                    </MenuItem>
                  )
              }
              {
                options
                  .map((option, index) => (
                    <MenuItem key={index} value={option.value} disabled={!!option.disabled}>
                      {typeof option.name === 'string' ? t(option.name) : option.name}
                    </MenuItem>
                    )
                  )
              }
            </Select>

            {!!((touched || displayErrorWhenNotTouched) && error) ? <FormHelperText>{t(error)}</FormHelperText> : null}
          </FormControl>
        );
      }
    }
  ));

export const RenderCheckbox = translate('common')(({ input, label, disabled, t, tReady, ...custom}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value}
          onChange={input.onChange}
          disabled={!!disabled}
          color="secondary"
          { ...custom }
        />
      }
      label={t(label)}
    />
  );
});

export const RenderDatePicker = translate('common')(({ input, label, disablePast, meta, t, tReady, required, format, minDate, maxDate, openToYearSelection }) => {
  const { touched, error } = meta;

  return (
    <div className="date-picker-wrapper">
      <DatePicker
        label={<span>{t(label)} <span>{required ? '*' : ''}</span></span>}
        invalidLabel={''}
        autoOk
        clearable
        keyboard
        onOpen={input.onBlur}
        onChange={(e) => input.onChange(e ? e.format(format || DATE_FORMAT) : null)}
        error={!!(touched && error)}
        helperText={!!(touched && error) ? error : ''}
        value={input.value}
        format={format || DATE_FORMAT}
        leftArrowIcon={<LeftIcon/>}
        rightArrowIcon={<RightIcon/>}
        keyboardIcon={<CalendarIcon/>}
        disablePast={!!disablePast}
        minDate={minDate}
        maxDate={maxDate}
        openToYearSelection={openToYearSelection}
        fullWidth
      />
    </div>
  );
});

// export const RenderTimePicker = ({ input, label }) => {
//   return (
//     <div>
//       <TimePicker
//         invalidLabel={label}
//         onChange={input.onChange}
//         value={input.value}
//       />
//     </div>
//   );
// };

// export const RenderDateTimePicker = translate('common')(({ input, label, disablePast, meta, t, tReady, required, format, minDate }) => {
//   const { touched, error } = meta;
//
//   return (
//     <DateTimePicker
//       ampm={false}
//       autoOk
//       clearable
//       dateRangeIcon={<CalendarIcon/>}
//       disablePast={!!disablePast}
//       disableOpenOnEnter
//       error={!!(touched && error)}
//       format={format || DATE_TIME_FORMAT}
//       fullWidth
//       keyboard={true}
//       keyboardIcon={<CalendarIcon/>}
//       label={<span>{t(label)}<span>{required ? '*' : ''}</span></span>}
//       leftArrowIcon={<LeftIcon/>}
//       onChange={(e) => input.onChange(e ? e.format(format || DATE_TIME_FORMAT) : null)}
//       onOpen={input.onBlur}
//       rightArrowIcon={<RightIcon/>}
//       timeIcon={<ClockIcon/>}
//       value={input.value}
//       minDate={minDate}
//     />
//   );
// });
//
// export const RenderRichTextField = Loadable({
//   loader: () => import('./RichTextEditor'),
//   loading: Loading,
// });
