/**
 * Created by vladtomsa on 03/12/2018
 */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from 'mdi-material-ui/ChevronDown';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Loading from 'components/Loading';
import {
  getIdentityUseRequests,
  resetIdentityUseRequests,
} from 'actions/identityUse';
import {
  getProviderServices,
} from 'actions/provider';
import {identityUseConstants} from 'constants/identityUse';
import {IDENTITY_USE_REQUEST_STATUSES} from 'constants/index';
import groupBy from 'lodash/groupBy';
import FilterForm from './FilterForm';
import IdentityUseRequestsList from './List';
import styles from './styles';

const initialFilterFormValues = {
  ownerAddress: '',
  pendingApproval: true,
  active: true,
  declined: true,
  ended: true,
};


class IdentityUse extends Component {

  state = {
    filterFormValue: initialFilterFormValues,
    hiddenDetails: {}, // for expansion panel
  };

  componentDidMount() {
    const {userInfo: {personaAddress}, getProviderServices} = this.props;
    this.getUserIdentityUseRequests();
    getProviderServices(personaAddress);
  }

  componentWillUnmount() {
    this.props.resetIdentityUseRequests();
  }

  getUserIdentityUseRequests(params = {}) {
    const {userInfo: {personaAddress}, getIdentityUseRequests} = this.props;

    getIdentityUseRequests({
      ...params,
      serviceProvider: personaAddress,
    });
  }

  onIdentityUseRequestSelect = (serviceInfo, identityRequestInfo) => {
    const serviceId = serviceInfo.id;
    const owner = identityRequestInfo.owner;

    this.props.goToDetail(serviceId, owner);
  };

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
      let isRequestValid = request.owner.toLowerCase().includes(filterFormValue.ownerAddress.toLowerCase());

      if (isRequestValid) {
        isRequestValid = toDisplayStatuses.findIndex(status => status === request.status) !== -1;
      }

      return isRequestValid;
    });

    return {
      displayRequests,
      toDisplayStatuses,
    };
  };

  render() {
    const {classes, isLoading, providerServiceInfoList, t, userInfo: { personaAddress }} = this.props;
    const {filterFormValue, hiddenDetails} = this.state;

    if (isLoading === identityUseConstants.GET_IDENTITY_USE_REQUEST_INIT) return <Loading/>;

    const {
      displayRequests,
      toDisplayStatuses,
    } = this.filterDisplayRequests();

    const groupedByService = groupBy(displayRequests, 'name');

    return (
      <Fragment>
        <FilterForm
          initialValues={filterFormValue}
          onSubmit={(values) => this.setState({filterFormValue: values})}
          onReset={() => this.setState({filterFormValue: initialFilterFormValues})}
          t={t}
        />

        <br />

        {
          providerServiceInfoList && providerServiceInfoList.length
            ? (
              providerServiceInfoList
                .filter((service) => !!groupedByService[service.name])
                .map((service) => {
                  const groupedRequestsInfo = groupBy(groupedByService[service.name], 'status');

                  return (
                    <ExpansionPanel
                      classes={{root: classes.expansionPanel}}
                      key={service.name}
                      expanded={!hiddenDetails[service.name]}
                      onChange={() => this.setState((prevState) => {
                        return {
                          ...prevState,
                          hiddenDetails: {
                            ...prevState.hiddenDetails,
                            [service.name]: !prevState.hiddenDetails[service.name],
                          }
                        }
                      })}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <div>
                          <Typography variant="headline" gutterBottom color="textPrimary">
                            {service.name}
                          </Typography>

                          <Typography variant="caption">
                            { service.description }
                          </Typography>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Grid container spacing={8}>
                          {
                            toDisplayStatuses
                              .map(key => (
                                <Grid item key={key} xs={12} md className={classes.gridItem}>
                                  <IdentityUseRequestsList
                                    title={key}
                                    identityUseRequestInfoList={groupedRequestsInfo[key] || []}
                                    onIdentityUseRequestSelect={(identityReq) => this.onIdentityUseRequestSelect(service, identityReq)}
                                    params={{ serviceProvider: personaAddress }}
                                    t={t}
                                  />
                                </Grid>
                              ))
                          }
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })
            )
            : null
        }
      </Fragment>
    );
  }
}

IdentityUse.propTypes = {
  classes: PropTypes.object.isRequired,
  getIdentityUseRequests: PropTypes.func.isRequired,
  getProviderServices: PropTypes.func.isRequired,
  goToDetail: PropTypes.func.isRequired,
  identityUseRequestInfoList: PropTypes.array.isRequired,
  providerServiceInfoList: PropTypes.array.isRequired,
  resetIdentityUseRequests: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  isLoading: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    identityUseRequestInfoList: state.identityUse.identityUseRequestInfoList,
    isLoading: state.identityUse.isLoading,
    providerServiceInfoList: state.provider.providerServiceInfoList,
    userInfo: state.auth.userInfo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProviderServices: (address) => dispatch(getProviderServices(address)),
    getIdentityUseRequests: (params) => dispatch(getIdentityUseRequests(params)),
    resetIdentityUseRequests: () => dispatch(resetIdentityUseRequests()),
    goToDetail: (serviceId, owner) => dispatch(push(`/provider/identity-use-requests/${serviceId}/${owner}`)),
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(IdentityUse);

const withTranslate = translate('common')(withConnect);

export default withStyles(styles)(withTranslate);

