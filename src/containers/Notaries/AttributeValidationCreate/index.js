/**
 * Created by vladtomsa on 12/11/2018
 */
import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import AttributeValidationCreateForm from './form';
import {StepContent} from "@material-ui/core";

const STEPS = [
  { label: 'SELECT_ATTRIBUTE' },
  { label: 'SUBMIT_NOTARIZATION' },
];

class AttributeValidationCreate extends Component {
  state = {
    activeStep: 0,
    selectedAttribute: '',
  };

  toggleStepLabelClick = (index) => {
    const { activeStep } = this.state;
    if (activeStep > index) {
      this.setState({ activeStep: index });
    }
  };

  toggleSelectedAttribute = (value) => {
    this.setState({ selectedAttribute: value });
  };

  getCurrentStep = () => {
    const { onClose, onSubmit, notaryInfo, userAttributes,  t } = this.props;
    const { activeStep, selectedAttribute } = this.state;

    switch (activeStep) {
      case 0:
        return (
          <Fragment>
            <FormControl fullWidth>
              <InputLabel>{t('SELECT_ATTRIBUTE')}</InputLabel>
              <Select
                value={selectedAttribute}
                onChange={(ev) => this.toggleSelectedAttribute(ev.target.value)}
                native
              >
                <option value=""></option>

                {
                  userAttributes.map(attribute => {
                    return (
                      <option key={attribute.id} value={attribute.type}>{t(attribute.type)}</option>
                    );
                  })
                }
              </Select>
            </FormControl>

            <br />

            {
              selectedAttribute && selectedAttribute !== ''
                ? (
                  <Fragment>
                    <br />


                    <div className="flex justify-end">
                      <Button
                        color="primary"
                        onClick={() => this.setState({ activeStep: activeStep + 1 })}
                        variant="contained"
                      >
                        { t('NEXT') }
                      </Button>
                    </div>
                  </Fragment>
                )
                : null
            }
          </Fragment>
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
                    type: selectedAttribute,
                    validator: notaryInfo.personaAddress,
                  }],
                },
              })}
              text={
                t('SUBMIT_NOTORIZATION_CONFIRMATION', {
                  firstName: notaryInfo.contactInfo.firstName,
                  lastName: notaryInfo.contactInfo.lastName,
                  address: notaryInfo.personaAddress,
                  type: t(selectedAttribute).toLowerCase(),
                })
              }
            />
          </div>
        );
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
         <Stepper activeStep={activeStep} orientation="vertical">
           {STEPS.map(({ label }, index) => {
             return (
               <Step key={label}>
                 <StepLabel onClick={() => this.toggleStepLabelClick(index)}>{t(label)}</StepLabel>

                 <StepContent>
                   <CardContent>
                     { this.getCurrentStep() }
                   </CardContent>
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
    userAttributes: state.attributes.userAttributes,
  }
};


AttributeValidationCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withConnect = connect(mapStateToProps)(AttributeValidationCreate);

const withStyle = withStyles(styles)(withConnect);

export default withStyle;
