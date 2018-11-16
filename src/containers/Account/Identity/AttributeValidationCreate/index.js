/**
 * Created by vladtomsa on 12/11/2018
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core/styles';
import { getNotariesByLocation, resetNotaries } from 'actions/notaries';
import styles from './styles';

import NotaryList from 'components/Notaries/List';
import NotariesSearchForm from 'components/Notaries/SearchForm';
import AttributeValidationCreateForm from './form';

const STEPS = [
  { label: 'SEARCH_FOR_NOTARIES' },
  { label: 'SELECT_NOTARY' },
  { label: 'SUBMIT_NOTARIZATION' },
];

class AttributeValidationCreate extends Component {
  state = {
    activeStep: 0,
    notaryInfo: null,
  };

  componentWillUnmount() {
    this.props.resetNotaries();
  }

  getCurrentStep = () => {
    const { notaryInfoList, onClose, onSubmit, selectedAttribute,  t } = this.props;
    const { activeStep, notaryInfo } = this.state;

    switch (activeStep) {
      case 0:
        return (
          <NotariesSearchForm onSubmit={this.onFindNotaries} t={t}/>
        );
      case 1:
        return (
          <NotaryList notaryInfoList={notaryInfoList} onSelect={this.onNotarySelect} t={t}/>
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
                  type: t(selectedAttribute.name),
                })
              }
            />
          </div>
        )
    }
  };

  getNotaries = (params = {}) => {
    const {getNotariesByLocation, pageNumber, pageSize} = this.props;

    getNotariesByLocation({
      ...params,
      pageNumber: params.pageNumber || pageNumber,
      pageSize: params.pageSize || pageSize,
    })
      .then((value) => {
        this.setState({ activeStep: 1 })
      })
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
      activeStep: 2,
    });
  };

  toggleStepLabelClick = (index) => {
    const { activeStep } = this.state;
    if (activeStep > index) {
      this.setState({ activeStep: index });
    }
  };

  render() {
    const { classes, onClose, t } = this.props;
    const { activeStep } = this.state;

    return (
      <Dialog
        open
        fullWidth
        maxWidth="lg"
        onClose={onClose}
      >
       <DialogContent className={classes.dialogContent}>
         <Stepper activeStep={activeStep} orientation="horizontal">
           {STEPS.map(({ label }, index) => {
             return (
               <Step key={label}>
                 <StepLabel onClick={() => this.toggleStepLabelClick(index)}>{t(label)}</StepLabel>
               </Step>
             );
           })}
         </Stepper>

         <CardContent>
           { this.getCurrentStep() }
         </CardContent>

       </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.notaries.isLoading,
    notaryInfoList: state.notaries.notaryInfoList,
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
