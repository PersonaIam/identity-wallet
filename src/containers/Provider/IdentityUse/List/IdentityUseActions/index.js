/**
 * Created by vladtomsa on 14/11/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {
  IDENTITY_USE_REQUEST_ACTION,
  IDENTITY_USE_REQUEST_STATUSES,
} from 'constants/index';
import { identityUseConstants } from 'constants/identityUse';
import CheckCircle from 'mdi-material-ui/CheckCircle';
import CloseCircle from 'mdi-material-ui/CloseCircle';
import MessageText from 'mdi-material-ui/MessageText';

import { handleIdentityUseRequest } from 'actions/identityUse';

import IdentityUseActionsForm from './Form/index';

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
    block: {
      [theme.breakpoints.up('md')]: {
        padding: 4,
      },
      '& svg': {
        color: amber[500],
      },
    },
    reason: {
      [theme.breakpoints.up('md')]: {
        padding: 4,
      },
    }
  }
};

class IdentityUseActions extends Component {

  state = {
    actionType: null,
    displayReasonMessage: null,
  };

  onAction = (actionType) => {
    this.setState({ actionType });
  };

  onValidationSubmit = (values) => {
    const { actionType } = this.state;
    const { handleIdentityUseRequest } = this.props;

    handleIdentityUseRequest(values, actionType);
  };

  getInitialFormValues = () => {
    const { identityUseRequest: { name, owner, provider } } = this.props;

    return {
      asset: {
        identityuse: [{
          owner,
          serviceName: name,
          serviceProvider: provider,
        }],
      },
    };
  };

  getIdentityUseActions = () => {
    const { classes, identityUseRequest, t } = this.props;

    const { reason, status } = identityUseRequest;

    const {
      PENDING_APPROVAL,
      DECLINED,
    } = IDENTITY_USE_REQUEST_STATUSES;


    switch (status) {
      case PENDING_APPROVAL:
        return (
          <Fragment>
            <Tooltip title={t('APPROVE_IDENTITY_USE_REQUEST')}>
              <IconButton className={classes.success} onClick={() => this.onAction(IDENTITY_USE_REQUEST_ACTION.APPROVE)}>
                <CheckCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('DECLINE')}>
              <IconButton className={classes.error} onClick={() => this.onAction(IDENTITY_USE_REQUEST_ACTION.DECLINE)}>
                <CloseCircle />
              </IconButton>
            </Tooltip>
          </Fragment>
        );

      case DECLINED:
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
        { this.getIdentityUseActions() }

        {
          actionType || actionType === 0
            ? (
              <IdentityUseActionsForm
                actionType={actionType}
                initialValues={this.getInitialFormValues()}
                onClose={() => this.onAction(null)}
                onSubmit={this.onValidationSubmit}
                isLoading={isLoading === identityUseConstants.ON_IDENTITY_USE_UPDATE_INIT}
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
    isLoading: state.identityUse.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIdentityUseRequest: (data, actionType) => dispatch(handleIdentityUseRequest(data, actionType)),
  };
};

IdentityUseActions.propTypes = {
  classes: PropTypes.object.isRequired,
  handleIdentityUseRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.any,
  identityUseRequest: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(IdentityUseActions);

const withStyle = withStyles(styles)(withConnect);

export default withStyle;
