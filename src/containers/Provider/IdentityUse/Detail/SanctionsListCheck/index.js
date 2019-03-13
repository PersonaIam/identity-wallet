/**
 * Created by vladtomsa on 2019-03-11
 */
import React, {Component, Fragment} from 'react';
import compose from 'lodash/fp/compose';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import Incognito from 'mdi-material-ui/Incognito';
import Loading from 'components/Loading';
import {decryptValue} from 'helpers/personaService';
import {removePassphrase} from 'actions/global';
import {onNotificationErrorInit} from 'actions/notifications';
import {getSanctions, resetSanctions} from 'actions/sanctions';
import PassphrasePromt from './PassphrasePromtForm';
import SanctionEntitiesList from './SanctionEntitiesList';

class SanctionsListCheck extends Component {
  state = {
    activeStep: 0,
    isDialogOpened: false,
    decryptedValues: [],
  };

  toggleActiveStep = (value) => {
    this.setState({activeStep: value});
  };

  toggleDialog = () => {
    this.setState(prevState => ({
      ...prevState,
      activeStep: 0,
      isDialogOpened: !prevState.isDialogOpened,
    }));

    this.props.resetSanctions();
  };

  componentDidMount() {
    const {passphrase} = this.props;

    if (passphrase) {
      this.decyptValues(passphrase)
    }
  }

  componentWillUnmount() {
    this.props.resetSanctions();
  }

  decyptValues = (passphrase) => {
    try {
      const {sanctionableAttributes} = this.props;

      const decryptedValues = [];

      Object.keys(sanctionableAttributes)
        .forEach(key => {
          const attribute = sanctionableAttributes[key];

          const decryptedValue = decryptValue(attribute.value, passphrase);

          decryptedValues.push({
            type: attribute.type,
            value: decryptedValue,
          });
        });

      this.setState({decryptedValues});
    } catch (e) {
      this.props.onNotificationErrorInit('FAILED_TO_DECRYPT_VALUE');
      this.props.removePassphrase();
    }
  };

  getSanctions = () => {
    const { decryptedValues } = this.state;

    this.toggleActiveStep(1);
    this.props.getSanctions(decryptedValues);
  };

  render() {
    const {
      sanctionEntitites,
      isLoading,
      t,
    } = this.props;
    const {
      activeStep,
      decryptedValues,
      isDialogOpened,
    } = this.state;

    const SanctionsDialog = () => (
      <Dialog
        open={true}
        onClose={this.toggleDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {t('CHECK_IN_SANCTIONS_LIST')}
        </DialogTitle>
        <DialogContent>
          <Stepper
            activeStep={activeStep}
            style={{padding: 0}}
            orientation="vertical"
          >
            <Step>
              <StepLabel>{t('CHECK_FALLOWING_ATTRIBUTES_OVER_SANTIONS_LIST')}</StepLabel>

              <StepContent>
                <ul>
                  {
                    decryptedValues.map(value => {
                      return (
                        <Typography key={value.type} variant="body2" component="li" color="textSecondary">
                          <strong>{t(value.type)}: </strong>&nbsp;{value.value}
                        </Typography>
                      );
                    })
                  }
                </ul>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>{t('RESULTS')}</StepLabel>

              <StepContent>
                {
                  isLoading
                    ? <Loading/>
                    : (
                      <SanctionEntitiesList
                        sanctionEntities={sanctionEntitites}
                        t={t}
                      />
                    )
                }
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.toggleDialog}>
            {t('CLOSE')}
          </Button>

          {
            activeStep === 0
              ? (
                <Button
                  color="primary"
                  className={`flex align-center`}
                  disabled={isLoading}
                  onClick={this.getSanctions}
                  variant="outlined"
                >
                  <div className="flex align-center">
                    {t("SUBMIT")}&nbsp;
                    {
                      isLoading
                        ? (
                          <CircularProgress size={16}/>
                        )
                        : null
                    }
                  </div>
                </Button>
              )
              : null
          }
        </DialogActions>
      </Dialog>
    );

    return (
      <Fragment>
        <Button
          color="primary"
          variant="outlined"
          onClick={this.toggleDialog}
        >
          <span className="flex align-center">
            <Incognito/>
            &nbsp;
            {t('CHECK_IN_SANCTIONS_LIST')}
          </span>
        </Button>

        {
          isDialogOpened
            ? (
              decryptedValues && decryptedValues.length
                ? <SanctionsDialog/>
                : (
                  <PassphrasePromt
                    onClose={this.toggleDialog}
                    onSubmit={({passphrase}) => this.decyptValues(passphrase)}
                    t={t}
                  />
                )
            )
            : null
        }
      </Fragment>
    );
  }
}

SanctionsListCheck.propTypes = {
  sanctionableAttributes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.sanctions.isLoading,
    passphrase: state.global.passphrase,
    sanctionEntitites: state.sanctions.sanctionEntitites,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSanctions: (params) => dispatch(getSanctions(params)),
    onNotificationErrorInit: (message) => dispatch(onNotificationErrorInit(message)),
    removePassphrase: () => dispatch(removePassphrase()),
    resetSanctions: () => dispatch(resetSanctions()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(SanctionsListCheck);
