/**
 * Created by vladtomsa on 01/10/2018
 */
import React from 'react';
import Recaptcha from 'react-recaptcha';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {translate} from 'react-i18next';

const RecaptchaField = (props) => {
  const { input: { onChange },  meta: { touched, error }, t } = props;

  return (
    <FormControl error={!!(touched && error)} fullWidth >
      <InputLabel>
        {t('BOOT_VERIFICATION')}
      </InputLabel>

      <div style={{ marginTop: 52 }}>
        <Recaptcha
          badge="inline"
          sitekey={RECAPTCHA_KEY}
          // size="compact"
          // theme="dark"
          verifyCallback={onChange}
        />
      </div>

      { touched && error ? <FormHelperText style={{ marginLeft: 0 }}>{ t(error) }</FormHelperText> : null }
    </FormControl>
  );
};

export default translate('common')(RecaptchaField);
