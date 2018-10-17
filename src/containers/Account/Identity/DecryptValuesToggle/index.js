/**
 * Created by vladtomsa on 15/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import PassphraseInput from 'components/FormInputs/PassphraseInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from 'mdi-material-ui/ChevronDown';

const validate = (values) => {
  const errors = {};
  if (!values.passphrase) {
    errors.passphrase = 'PASSPHRASE_REQUIRED';
  }

  return errors;
};

class DecryptValuesToggle extends Component {
  state = {
    isExpanded: true,
  };

  toggleIsExpanded = () => {
    this.setState((prevState) => ({ ...prevState, isExpanded: !prevState.isExpanded }));
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    const { t } = this.props;
    const { isExpanded } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <ExpansionPanel expanded={!!isExpanded}  onChange={this.toggleIsExpanded}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title">
              {t('DECRYPT_ALL_VALUES')}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <Typography variant="caption">{t('You\'re the owner of your information. We store all your data encryped.')}</Typography>

              <Typography variant="caption">{t('In order to display your actual information you need to provide your pass phrase')}</Typography>

              <br />

              <Field
                name="passphrase"
                component={PassphraseInput}
                label="PASSPHRASE"
                type="password"
                required
              />

              <Button type="submit">
                {t('DECRYPT_ALL_VALUES')}
              </Button>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </form>
    );
  }
}

DecryptValuesToggle.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'DecryptAllValuesForm',
  validate,
})(DecryptValuesToggle);
