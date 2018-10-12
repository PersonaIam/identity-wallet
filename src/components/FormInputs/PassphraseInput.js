/**
 * Created by vladtomsa on 10/10/2018
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { RenderTextField } from './index';
import { storePassphrase, removePassphrase } from 'actions/global';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Info from 'mdi-material-ui/Information';

class PassphraseInput extends Component {
  state = {
    rememberPassphrase: false,
  };

  componentWillMount() {
    const { passphrase, input: { onChange } } = this.props;

    if (passphrase) {
      onChange(passphrase);

      this.setState({ rememberPassphrase: true });
    }
  }

  toggleRememberPassphrase = () => {
    this.setState(
      (prevState) => ({...prevState, rememberPassphrase: !prevState.rememberPassphrase}),
      () => {
        // when user deselects the checkbox, make sure to remove passphrase from store
        const { rememberPassphrase } = this.state;

        if (rememberPassphrase) {
          const { input: { value }, storePassphrase } = this.props;

          storePassphrase(value);
        }
        else {
          this.props.removePassphrase();
        }
      },
    );
  };

  render() {
    // eslint-disable-next-line
    const { dispatch, i18n, t, tReady, passphrase, removePassphrase, storePassphrase, ...reduxFormProps } = this.props;
    const { rememberPassphrase } = this.state;

    const onInputChange = (event) => {
      reduxFormProps.input.onChange(event);

      if (rememberPassphrase) {
        storePassphrase(event.target.value);
      }
    };


    return (
      <div>
        <RenderTextField {...reduxFormProps} onChange={onInputChange}/>
        <br />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberPassphrase}
              onChange={this.toggleRememberPassphrase}
            />
          }
          label={(
            <div className="flex align-center">
              <span>{t('REMEMBER_PASSPHRASE')}</span>
              &nbsp;
              <Tooltip title={t('REMEMBER_ONLY_FOR_CURRENT_INSTANCE')} >
                <Info style={{ color: '#AAAAAA' }}/>
              </Tooltip>
            </div>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    passphrase: state.global.passphrase,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    storePassphrase: (value) => dispatch(storePassphrase(value)),
    removePassphrase: () => dispatch(removePassphrase()),
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(PassphraseInput);

const withTranslate = translate('common')(withConnect);

export default withTranslate;
