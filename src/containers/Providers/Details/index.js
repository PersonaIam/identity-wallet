/**
 * Created by vladtomsa on 29/11/2018
 */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {push} from 'react-router-redux';
import {withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
// import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
// import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Back from 'mdi-material-ui/ChevronLeft';

import {
  getProviderByAddress,
} from 'actions/providers';

import {
  getIdentityUseRequests,
  selectServiceForIdentityUse,
  deselectServiceForIdentityUse,
  createIdentityUseRequest,
  resetIdentityUseRequests,
} from 'actions/identityUse';

import {providersConstants} from 'constants/providers';
import Loading from 'components/Loading';
import CreateIdentityUseRequestForm from './Form/CreateIdentityUseRequestForm';
import ServiceList from './ServiceList';
import styles from './styles';

class Providers extends Component {

  componentDidMount() {
    const {
      getIdentityUseRequests,
      getProviderByAddress,
      match: {params: {personaAddress}},
      userInfo,
    } = this.props;

    getIdentityUseRequests({
      owner: userInfo.personaAddress,
    });
    getProviderByAddress(personaAddress);
  };

  componentWillUnmount() {
    this.props.resetIdentityUseRequests();
  }

  toggleSelectedService = (service) => {
    const {
      selectServiceForIdentityUse,
      deselectServiceForIdentityUse,
    } = this.props;
    if (service) {
      selectServiceForIdentityUse(service);
    }
    else {
      deselectServiceForIdentityUse();
    }
  };

  onCreateIdentityUseRequest = (values) => {
    const {attributes, passphrase} = values;
    const {createIdentityUseRequest} = this.props;

    createIdentityUseRequest(attributes, passphrase);
  };

  render() {
    const {
      goToProviders,
      isLoading,
      match: {params: {personaAddress}},
      selectedProviderInfo,
      selectedServiceForIdentityUse,
      t,
      userAttributes,
    } = this.props;

    let providerName;

    if (
      !!selectedProviderInfo
      && selectedProviderInfo.contactInfo
      && (selectedProviderInfo.contactInfo.firstName || selectedProviderInfo.contactInfo.lastName)
    ) {
      providerName = `${selectedProviderInfo.contactInfo.firstName} ${selectedProviderInfo.contactInfo.lastName}`;
    }

    return (
      <div>
        <br/>
        <div className='flex align-center'>
          <Tooltip title={t('PROVIDERS')}>
            <Fab  color="primary" size="small" onClick={goToProviders}>
              <Back/>
            </Fab>
          </Tooltip>
          &nbsp;&nbsp;
          <div>
            {
              providerName &&
              <Typography variant='display1' style={{wordBreak: 'break-all'}}>
                {providerName}
              </Typography>
            }

            <Typography variant='subheading' style={{wordBreak: 'break-all'}}>
              {personaAddress}
            </Typography>
          </div>
        </div>
        <br/>
        <Divider/>
        <br/>

        {
          isLoading === providersConstants.ON_GET_PROVIDER_BY_ADDRESS_INIT
            ? (
              <Loading/>
            )
            : (
              selectedProviderInfo
                ? (
                  <Fragment>
                    <br/>
                    {
                      selectedProviderInfo.services
                      && selectedProviderInfo.services.length
                        ? (
                          <ServiceList
                            onRequestService={this.toggleSelectedService}
                            serviceInfoList={selectedProviderInfo.services}
                            userAttributes={userAttributes}
                            t={t}
                          />
                        )
                        : null
                    }

                    {
                      selectedServiceForIdentityUse
                        ? (
                          <CreateIdentityUseRequestForm
                            onSubmit={this.onCreateIdentityUseRequest}
                            onClose={() => this.toggleSelectedService(null)}
                            serviceInfo={selectedServiceForIdentityUse}
                            userAttributes={userAttributes}
                            isLoading={isLoading}
                            t={t}
                          />
                        )
                        : null
                    }
                  </Fragment>
                )
                : null
            )
        }
      </div>
    );
  }
}

Providers.propTypes = {
  createIdentityUseRequest: PropTypes.func.isRequired,
  selectedServiceForIdentityUse: PropTypes.any,
  deselectServiceForIdentityUse: PropTypes.func.isRequired,
  getProviderByAddress: PropTypes.func.isRequired,
  goToProviders: PropTypes.func.isRequired,
  selectServiceForIdentityUse: PropTypes.func.isRequired,
  userAttributes: PropTypes.any,
  userInfo: PropTypes.object.isRequired,
  resetIdentityUseRequests: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const userIdentityUseRequests = state.identityUse.identityUseRequestInfoList;
  const selectedProviderInfo = state.providers.selectedProviderInfo;

  return {
    selectedProviderInfo: {
      ...selectedProviderInfo,
      services: selectedProviderInfo
        ? selectedProviderInfo.services.map((service) => {
            const userIdentityRequest = userIdentityUseRequests.find((r) => {
              return r.name === service.name && r.provider === service.provider;
            });

            service.userIdentityRequest = userIdentityRequest;

            return service;
          }
        )
        : null
    },
    userAttributes: state.attributes.userAttributes,
    isLoading: state.providers.isLoading || state.identityUse.isLoading,
    selectedServiceForIdentityUse: state.identityUse.selectedServiceForIdentityUse,
    userInfo: state.auth.userInfo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProviderByAddress: (address) => dispatch(getProviderByAddress(address)),
    goToProviders: () => dispatch(push(`/providers`)),
    selectServiceForIdentityUse: (service) => dispatch(selectServiceForIdentityUse(service)),
    deselectServiceForIdentityUse: () => dispatch(deselectServiceForIdentityUse()),
    createIdentityUseRequest: (data, passphrase) => dispatch(createIdentityUseRequest(data, passphrase)),
    getIdentityUseRequests: (params) => dispatch(getIdentityUseRequests(params)),
    resetIdentityUseRequests: () => dispatch(resetIdentityUseRequests()),
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Providers);

const withTranslate = translate('common')(withConnect);

const withStyle = withStyles(styles)(withTranslate);

export default withStyle;
