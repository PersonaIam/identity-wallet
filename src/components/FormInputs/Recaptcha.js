/**
 * Created by vladtomsa on 01/10/2018
 */
import React from 'react';
import Recaptcha from 'react-recaptcha';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {translate} from 'react-i18next';


const RecaptchaField = (props) => {
  const { input: { onChange },  meta: { touched, error }, t } = props;

  return (
    <FormControl error={!!(touched && error)} fullWidth >
      <Recaptcha
        className="flex justify-center"
        sitekey="6LcH_nIUAAAAAAAq_jKpp4gJ_3H8G-JrqFWB4zTL"
        verifyCallback={onChange}
      />

      { touched && error ? <FormHelperText>{ t(error) }</FormHelperText> : null }
    </FormControl>
  );
};

export default translate('common')(RecaptchaField);
