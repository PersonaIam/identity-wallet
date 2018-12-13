/**
 * Created by vladtomsa on 03/12/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import {
  getIdentityUseRequests,
  resetIdentityUseRequests,
} from 'actions/identityUse';
import Loading from 'components/Loading';
import {IDENTITY_USE_REQUEST_STATUSES} from 'constants/index';
import groupBy from 'lodash/groupBy';
import IdentityUseRequestList from './List';
import styles from './styles';

const initialFilterFormValues = {
  pendingApproval: true,
  active: true,
  declined: true,
  ended: true,
  canceled: true,
};


class IdentityUse extends Component {

  state = {
    filterFormValue: initialFilterFormValues,
  };

  componentDidMount() {
    this.getUserIdentityUseRequests();
  }

  componentWillUnmount() {
    this.props.resetIdentityUseRequests();
  }

  getUserIdentityUseRequests(params = {}) {
    const { userInfo: { personaAddress }, getIdentityUseRequests } = this.props;

    getIdentityUseRequests({
      ...params,
      owner: personaAddress,
    });
  }

  filterDisplayRequests = () => {
    const {identityUseRequestInfoList} = this.props;
    const {filterFormValue} = this.state;

    const toDisplayStatuses = [];

    if (filterFormValue.pendingApproval) toDisplayStatuses.push(IDENTITY_USE_REQUEST_STATUSES.PENDING_APPROVAL);

    if (filterFormValue.active) toDisplayStatuses.push(IDENTITY_USE_REQUEST_STATUSES.ACTIVE);

    if (filterFormValue.declined) toDisplayStatuses.push(IDENTITY_USE_REQUEST_STATUSES.DECLINED);

    if (filterFormValue.ended) toDisplayStatuses.push(IDENTITY_USE_REQUEST_STATUSES.ENDED);

    if (filterFormValue.canceled) toDisplayStatuses.push(IDENTITY_USE_REQUEST_STATUSES.CANCELED);

    const displayRequests = identityUseRequestInfoList.filter((request) => {
      let isRequestValid = toDisplayStatuses.findIndex(status => status === request.status) !== -1;

      return isRequestValid;
    });

    return {
      displayRequests,
      toDisplayStatuses,
    };
  };

  render() {
    const { isLoading, t } = this.props;

    if (isLoading) return <Loading/>;

    const {
      displayRequests,
    } = this.filterDisplayRequests();

    const groupedByProvider = groupBy(displayRequests, 'provider');


    return (
      <Fragment>
        {
          Object.keys(groupedByProvider)
            .map((provider) => {
              const providerIdentityUseRequests = groupedByProvider[provider];

              return (
                <Fragment key={provider}>
                  <IdentityUseRequestList
                    providerIdentityUseRequests={providerIdentityUseRequests || []}
                    t={t}
                  />
                </Fragment>
              );
            })
        }
      </Fragment>
    );
  }
}

IdentityUse.propTypes = {
  classes: PropTypes.object.isRequired,
  getIdentityUseRequests: PropTypes.func.isRequired,
  identityUseRequestInfoList: PropTypes.array.isRequired,
  resetIdentityUseRequests: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    identityUseRequestInfoList: state.identityUse.identityUseRequestInfoList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getIdentityUseRequests: (params) => dispatch(getIdentityUseRequests(params)),
    resetIdentityUseRequests: () => dispatch(resetIdentityUseRequests()),
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(IdentityUse);

const withTranslate = translate('common')(withConnect);

export default withStyles(styles)(withTranslate);

