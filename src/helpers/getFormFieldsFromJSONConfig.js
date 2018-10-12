/**
 * Created by vladtomsa on 09/10/2018
 */
import React from 'react';
import { Field } from 'redux-form';
import { RenderTextField, RenderDatePicker } from 'components/FormInputs';
import FileUpload from 'components/FormInputs/FileUpload';

export const AVAILABLE_DATA_TYPES = {
  TEXT: 'text',
  DATE: 'date',
  FILE: 'file',
};

export const getFormFields = (fieldConfig) => {
  const { data_type, name, options, validation } = fieldConfig;

  const props = {
    name: name,
    label: name,
  };

  if (validation && validation.required) {
    props.required = true;
  }

  props.component = RenderTextField;

  switch (data_type) {
    case AVAILABLE_DATA_TYPES.TEXT:
      props.component = RenderTextField;
      props.type = options.type || 'text';
      break;
    case AVAILABLE_DATA_TYPES.DATE:
      props.component = RenderDatePicker;
      props.minDate = options.minDate;
      props.maxDate = options.maxDate;
      props.openToYearSelection = options.openToYearSelection;
      break;
    case AVAILABLE_DATA_TYPES.FILE:
      props.component = FileUpload;
      props.maxSize = options.maxSize;
      props.accept = options.accept;
      break;
    default:
      props.component = RenderTextField;
      break;
  }

  return (
    <Field {...props} />
  );
};

export const validateField = (fieldConfig, value) => {
  const { name, validation } = fieldConfig;
  let error = null;

  if (validation) {
    if (!value && validation.required) error = `${name} is required`;
    else if (value && validation.minLength && validation.minLength > value.length) error = `${name} is to short`;
    else if (value && validation.maxLength && validation.maxLength < value.length) error = `${name} is to long`;
    else if (value && validation.pattern) {
      const regex = new RegExp(validation.pattern, 'i');

      if (!regex.test(value)) {
        error = `${name} is invalid`;
      }
    }
  }

  return error;
};
