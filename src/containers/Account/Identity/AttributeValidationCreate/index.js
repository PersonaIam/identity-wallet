/**
 * Created by vladtomsa on 12/11/2018
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import {withStyles} from '@material-ui/core/styles';
import Close from 'mdi-material-ui/Close';
import {getNotariesByLocation, resetNotaries} from 'actions/notaries';
import styles from './styles';
import SelectNotaries from './SelectNotaries';
import AttributeValidationCreateForm from './Form';

const STEPS = [
  {name: 'SELECT_NOTARY', value: 0},
  {name: 'SUBMIT_NOTARIZATION', value: 1},
];

class AttributeValidationCreate extends Component {
  state = {
    activeStep: STEPS[0].value,
    notaryInfo: null,
  };

  componentWillUnmount() {
    this.props.resetNotaries();
  }

  getCurrentStep = () => {
    const {notaryInfoList, favoriteNotaries, onClose, onSubmit, selectedAttribute, t} = this.props;
    const {activeStep, notaryInfo} = this.state;

    switch (activeStep) {
      case 0:
        return (
          <SelectNotaries
            favoriteNotaries={favoriteNotaries}
            notaryInfoList={notaryInfoList}
            onSearchSubmit={this.onFindNotaries}
            onSelectNotary={this.onNotarySelect}
            onClose={onClose}
            t={t}
          />
        );

      default:
        return (
          <div>
            <AttributeValidationCreateForm
              t={t}
              onClose={onClose}
              onSubmit={(values) => onSubmit({
                secret: values.secret,
                asset: {
                  validation: [{
                    type: selectedAttribute.name,
                    validator: notaryInfo.personaAddress,
                  }],
                },
              })}
              text={
                t('SUBMIT_NOTORIZATION_CONFIRMATION', {
                  firstName: notaryInfo.contactInfo.firstName,
                  lastName: notaryInfo.contactInfo.lastName,
                  address: notaryInfo.personaAddress,
                  type: t(selectedAttribute.name).toLowerCase(),
                })
              }
            />
          </div>
        )
    }
  };

  getNotaries = (params = {}) => {
    const {
      getNotariesByLocation,
      pageNumber,
      pageSize,
    } = this.props;

    getNotariesByLocation({
      ...params,
      pageNumber: params.pageNumber || pageNumber,
      pageSize: params.pageSize || pageSize,
    });
  };

  onFindNotaries = (values) => {
    const location = values.location;

    if (location.lat && location.lng) {
      const getNotariesParams = {
        lat: location.lat,
        lng: location.lng,
      };

      this.getNotaries(getNotariesParams)
    }
  };

  onNotarySelect = (notaryInfo) => {
    this.setState({
      notaryInfo,
      activeStep: STEPS.find(step => step.name === 'SUBMIT_NOTARIZATION').value,
    });
  };

  toggleStepLabelClick = (index) => {
    const {activeStep} = this.state;

    if (activeStep > index) {
      this.setState({activeStep: index});
    }
  };

  render() {
    const {classes, onClose, selectedAttribute, t} = this.props;
    const {activeStep} = this.state;

    return (
      <Dialog
        open
        fullWidth
        maxWidth="lg"
        onClose={onClose}
      >
        <DialogTitle>
          <span className="flex align-center">
            <span className="fill-flex">
             {t('CREATE_VALIDATION_REQUEST_FOR', {attribute: t(selectedAttribute.name).toLowerCase()})}
            </span>
            &nbsp;
            <IconButton onClick={onClose}>
            <Close />
          </IconButton>
          </span>

        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {STEPS.map(({name}, index) => {
              return (
                <Step key={name}>
                  <StepLabel onClick={() => this.toggleStepLabelClick(index)}>{t(name)}</StepLabel>

                  <StepContent>
                    {this.getCurrentStep()}
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>

        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.notaries.isLoading,
    notaryInfoList: state.notaries.notaryInfoList,
    favoriteNotaries: state.notaries.favoriteNotaries,
    pageNumber: state.notaries.pageNumber,
    pageSize: state.notaries.pageSize,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotariesByLocation: (params) => dispatch(getNotariesByLocation(params)),
    resetNotaries: () => dispatch(resetNotaries()),
  };
};

AttributeValidationCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  createdAttributes: PropTypes.array,
  getNotariesByLocation: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  resetNotaries: PropTypes.func.isRequired,
  selectedAttribute: PropTypes.object,
  t: PropTypes.func.isRequired,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(AttributeValidationCreate);

const withStyle = withStyles(styles)(withConnect);

export default withStyle;
