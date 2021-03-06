/**
 * Created by vladtomsa on 14/11/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import lightGreen from '@material-ui/core/colors/lightGreen';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import CloseCircle from 'mdi-material-ui/CloseCircle';
import MessageText from 'mdi-material-ui/MessageText';

import { handleAttributeRequest } from 'actions/attributes';
import { openConversation } from 'actions/chat';

import {
  VALIDATION_REQUEST_ACTION,
  VALIDATION_REQUESTS_STATUSES,
} from 'constants/index';
import { attributesConstants } from 'constants/attributes';
import ValidationReason from 'components/ValidationReason';
import ValidationActionsForm from './Form/index';

const styles = (theme) => {
  return {
    success: {
      [theme.breakpoints.up('md')]: {
        padding: 4,
      },
      '& svg': {
        color: lightGreen['A400'],
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
    conversation: {
      [theme.breakpoints.up('md')]: {
        padding: 4,
      },
    },
  };
};

class ValidationActions extends Component {

  state = {
    actionType: null,
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
                  <ValidationReason reason={reason} t={t} />
                )
                : null
            }
          </Fragment>
        );
      default:
        return null;
    }
  };

  openConversation = () => {
    const { openConversation, validationRequest: { validator } } = this.props;
    const conversationMembers = [ validator ];

    openConversation(conversationMembers);
  };

  render() {
    const { classes, isLoading, t } = this.props;
    const { actionType } = this.state;

    return (
      <Fragment>
        <div className="flex space-between full-width">
          <Tooltip title={t('OPEN_CONVERSATION')}>
            <IconButton
              className={classes.conversation}
              color="secondary"
              onClick={this.openConversation}
              disableRipple
            >
              <MessageText />
            </IconButton>
          </Tooltip>

          <div>
            { this.getValidationActions() }
          </div>
        </div>

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
      </Fragment>
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
    openConversation: (members) => dispatch(openConversation(members)),
  };
};

ValidationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAttributeRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.any,
  openConversation: PropTypes.func.isRequired,
  validationRequest: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ValidationActions);

const withStyle = withStyles(styles)(withConnect);

export default withStyle;
