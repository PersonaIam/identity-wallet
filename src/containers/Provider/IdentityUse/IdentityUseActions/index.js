/**
 * Created by vladtomsa on 14/11/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import lightGreen from '@material-ui/core/colors/lightGreen';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {
  IDENTITY_USE_REQUEST_ACTION,
  IDENTITY_USE_REQUEST_STATUSES,
} from 'constants/index';
import { identityUseConstants } from 'constants/identityUse';
import CheckCircle from 'mdi-material-ui/CheckCircle';
import CloseCircle from 'mdi-material-ui/CloseCircle';

import { handleIdentityUseRequest } from 'actions/identityUse';
import ValidationReason from 'components/ValidationReason';
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
        color: lightGreen['A400'],
      },
      '&:disabled': {
        '& svg': {
          color: 'rgba(0, 0, 0, 0.26)',
        },
      },
    },
    error: {
      [theme.breakpoints.up('md')]: {
        padding: 4,
      },
      '& svg': {
        color: red[500],
      },
      '&:disabled': {
        '& svg': {
          color: 'rgba(0, 0, 0, 0.26)',
        },
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
    const { handleIdentityUseRequest, params } = this.props;

    handleIdentityUseRequest(values, actionType, params)
      .then((result) => {
        if (result) {
          this.setState({ actionType: null })
        }
      });
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
    const { classes, disabled, identityUseRequest, t } = this.props;

    const { reason, status } = identityUseRequest;

    const {
      PENDING_APPROVAL,
      DECLINED,
      ENDED,
    } = IDENTITY_USE_REQUEST_STATUSES;


    switch (status) {
      case PENDING_APPROVAL:
        return (
          <div className="flex">
            <Tooltip title={t('APPROVE_IDENTITY_USE_REQUEST')}>
              <div>
                <IconButton
                  className={classes.success}
                  disabled={!!disabled}
                  onClick={() => this.onAction(IDENTITY_USE_REQUEST_ACTION.APPROVE)}
                >
                  <CheckCircle />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip title={t('DECLINE')}>
              <div>
                <IconButton
                  className={classes.error}
                  disabled={!!disabled}
                  onClick={() => this.onAction(IDENTITY_USE_REQUEST_ACTION.DECLINE)}
                >
                  <CloseCircle />
                </IconButton>
              </div>
            </Tooltip>
          </div>
        );

      case DECLINED:
      case ENDED:
        return (
          <Fragment>
            {
              reason
                ? (
                  <ValidationReason reason={reason} t={t}/>
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
    const { isLoading, t } = this.props;
    const { actionType } = this.state;

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
    handleIdentityUseRequest: (data, actionType, params) => dispatch(handleIdentityUseRequest(data, actionType, params)),
  };
};

IdentityUseActions.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.any,
  handleIdentityUseRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.any,
  identityUseRequest: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(IdentityUseActions);

const withStyle = withStyles(styles)(withConnect);

export default withStyle;
