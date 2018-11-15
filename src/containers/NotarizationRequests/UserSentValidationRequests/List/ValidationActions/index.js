/**
 * Created by vladtomsa on 14/11/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {
  VALIDATION_REQUEST_ACTION,
  VALIDATION_REQUESTS_STATUSES,
} from 'constants/index';
import { attributesConstants } from 'constants/attributes';
import CloseCircle from 'mdi-material-ui/CloseCircle';
import MessageText from 'mdi-material-ui/MessageText';

import { handleAttributeRequest } from 'actions/attributes';

import ValidationActionsForm from './Form/index';

const styles = (theme) => {
  return {
    dialogContent: {
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      padding: 4,
      top: 0,
      right: 0,
    },
    success: {
      [theme.breakpoints.up('md')]: {
        padding: 4,
      },
      '& svg': {
        color: green[500],
      },
    },
    error: {
      [theme.breakpoints.up('md')]: {
        padding: 4,
      },
      '& svg': {
        color: red[500],
      },
    },
    reason: {
      [theme.breakpoints.up('md')]: {
        padding: 4,
      },
    }
  }
};

class ValidationActions extends Component {

  state = {
    actionType: null,
    displayReasonMessage: null,
  };

  onAction = (actionType) => {
    this.setState({ actionType });
  };

  onValidationSubmit = (values) => {
    const { actionType } = this.state;
    const { handleAttributeRequest } = this.props;

    handleAttributeRequest(values, actionType);
  };

  getInitialFormValues = () => {
    const { validationRequest: { type, owner, validator } } = this.props;

    return {
      asset: {
        validation: [{
          type,
          owner,
          validator,
        }],
      },
    };
  };

  getValidationActions = () => {
    const { classes, validationRequest, t } = this.props;

    const { reason, status } = validationRequest;

    const {
      PENDING_APPROVAL,
      DECLINED,
      REJECTED
    } = VALIDATION_REQUESTS_STATUSES;


    switch (status) {
      case PENDING_APPROVAL:
        return (
          <Fragment>
            <Tooltip title={t('CANCEL')}>
              <IconButton className={classes.error} onClick={() => this.onAction(VALIDATION_REQUEST_ACTION.CANCEL)}>
                <CloseCircle />
              </IconButton>
            </Tooltip>
          </Fragment>
        );
      case DECLINED:
      case REJECTED:
        return (
          <Fragment>
            {
              reason
                ? (
                  <Tooltip title={t('REASON') + reason}>
                    <IconButton className={classes.reason} onClick={() => this.setState({ displayReasonMessage: reason })} disableRipple>
                      <MessageText />
                    </IconButton>
                  </Tooltip>
                )
                : null
            }
          </Fragment>
        );
      default:
        return null;
    }
  };


  render() {
    const { classes, isLoading, t } = this.props;
    const { actionType, displayReasonMessage } = this.state;

    return (
      <div>
        { this.getValidationActions() }

        {
          actionType || actionType === 0
            ? (
              <ValidationActionsForm
                actionType={actionType}
                initialValues={this.getInitialFormValues()}
                onClose={() => this.onAction(null)}
                onSubmit={this.onValidationSubmit}
                isLoading={isLoading === attributesConstants.ON_VALIDATION_UPDATE_INIT}
                t={t}
              />
            )
            : null
        }

        <Dialog
          open={!!displayReasonMessage}
          onClose={() => this.setState({ displayReasonMessage: null })}
        >
          <DialogContent className={classes.dialogContent}>
            <IconButton
              className={classes.closeButton}
              onClick={() => this.setState({ displayReasonMessage: null })}
            >
              <CloseCircle />
            </IconButton>
            <DialogContentText>
              { displayReasonMessage }
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.attributes.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAttributeRequest: (data, actionType) => dispatch(handleAttributeRequest(data, actionType)),
  };
};

ValidationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAttributeRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.any,
  validationRequest: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ValidationActions);

const withStyle = withStyles(styles)(withConnect);

export default withStyle;
