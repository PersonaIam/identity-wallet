/**
 * Created by vladtomsa on 01/10/2018
 */
import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {translate} from 'react-i18next';

class RecaptchaField extends Component {
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    const { meta: { pristine } } = this.props;
    const newPristine = nextProps.meta.pristine;

    // When reseting the form reset recaptcha
    if (
      newPristine && !pristine
    ) {
      this.recaptcha.reset();
    }
  }

  render() {
    const { input: { onChange },  meta: { touched, error }, t } = this.props;

    return (
      <FormControl error={!!(touched && error)} fullWidth >
        <InputLabel>
          {t('BOOT_VERIFICATION')}
        </InputLabel>

        <div style={{ marginTop: 52 }}>
          <Recaptcha
            ref={e => this.recaptcha = e}
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
  }
}

export default translate('common')(RecaptchaField);
