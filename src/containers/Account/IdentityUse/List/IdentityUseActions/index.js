/**
 * Created by vladtomsa on 14/11/2018
 */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import lightGreen from '@material-ui/core/colors/lightGreen';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {
  IDENTITY_USE_REQUEST_ACTION,
  IDENTITY_USE_REQUEST_STATUSES,
} from 'constants/index';
import {identityUseConstants} from 'constants/identityUse';
import CloseCircle from 'mdi-material-ui/CloseCircle';
import Block from 'mdi-material-ui/BlockHelper';

import {handleIdentityUseRequest} from 'actions/identityUse';
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
      '& svg': {
        color: lightGreen['A400'],
      },
    },
    error: {
      '& svg': {
        color: red[500],
      },
    },
    block: {
      '& svg': {
        color: amber[500],
      },
    },
  }
};

class IdentityUseActions extends Component {

  state = {
    actionType: null,
  };

  onAction = (actionType) => {
    this.setState({actionType});
  };

  onValidationSubmit = (values) => {
    const {actionType} = this.state;
    const {handleIdentityUseRequest, params} = this.props;

    handleIdentityUseRequest(values, actionType, params)
      .then((result) => {
        if (result) {
          this.setState({actionType: null})
        }
      });
  };

  getInitialFormValues = () => {
    const {identityUseRequest: {name, owner, provider}} = this.props;

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
    const {classes, identityUseRequest, t} = this.props;

    const {reason, status} = identityUseRequest;

    const {
      PENDING_APPROVAL,
      ACTIVE,
      DECLINED,
      ENDED,
    } = IDENTITY_USE_REQUEST_STATUSES;


    switch (status) {
      case PENDING_APPROVAL:
        return (
          <Fragment>
            <Tooltip title={t('CANCEL')}>
              <IconButton className={classes.cancel} onClick={() => this.onAction(IDENTITY_USE_REQUEST_ACTION.CANCEL)}>
                <CloseCircle/>
              </IconButton>
            </Tooltip>
          </Fragment>
        );
      case ACTIVE:
        return (
          <Fragment>
            <Tooltip title={t('END')}>
              <IconButton className={classes.block} onClick={() => this.onAction(IDENTITY_USE_REQUEST_ACTION.END)}
                          disableRipple>
                <Block/>
              </IconButton>
            </Tooltip>
          </Fragment>
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
    const {isLoading, t} = this.props;
    const {actionType} = this.state;

    return (
      <div>
        {this.getIdentityUseActions()}

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
  handleIdentityUseRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.any,
  identityUseRequest: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(IdentityUseActions);

const withStyle = withStyles(styles)(withConnect);

export default withStyle;
