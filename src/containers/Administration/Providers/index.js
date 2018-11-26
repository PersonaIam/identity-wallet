/**
 * Created by vladtomsa on 22/11/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Loading from 'components/Loading';
import {getProviders, saveProvider, selectProviderInfo, deselectProviderInfo} from 'actions/administration';
import {administrationsConstants} from 'constants/administration';
import {USER_ROLES} from 'constants/index';

import ProviderForm from './Form';
import ProvidersList from './List';

class Providers extends Component {

  componentDidMount() {
    this.getProviders();
  };

  getProviders = (params = {}) => {
    const {getProviders, pageNumber, pageSize} = this.props;

    getProviders({
      ...params,
      pageNumber: params.pageNumber || params.pageNumber === 0 ? params.pageNumber : pageNumber,
      pageSize: params.pageSize || pageSize,
    })
  };

  onCreateProviderInit = () => {
    const initialProviderInfo = {
      contactInfo: {},
      userRoleId: USER_ROLES.PROVIDER,
    };

    this.toggleSelectProvider(initialProviderInfo);
  };

  toggleSelectProvider = (providerInfo) => {
    const { selectProviderInfo, deselectProviderInfo } = this.props;

    if (!!providerInfo) {
      selectProviderInfo(providerInfo)
    }
    else {
      deselectProviderInfo();
    }
  };

  onSaveProvider = (providerInfo) => {
    this.props.saveProvider(providerInfo);
  };

  render() {
    const {isLoading, providerInfoList, providersCount, pageNumber, pageSize, selectedProviderInfo, t} = this.props;
    return (
      <div>
        <div className="flex space-between">
          <Typography variant="display1">
            { t('PROVIDERS') }
          </Typography>

          <Button
            onClick={this.onCreateProviderInit}
            variant="contained"
            color="secondary"
          >
            { t('CREATE') }
          </Button>
        </div>
        <br />
        <Divider/>
        <br />

        {
          isLoading === administrationsConstants.ON_GET_ADMIN_PROVIDERS_INIT
            ? (
              <Loading />
            )
            : (
              providerInfoList && providerInfoList.length
                ? (
                  <ProvidersList
                    onChange={this.getProviders}
                    onProviderSelect={this.toggleSelectProvider}
                    providerInfoList={providerInfoList}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    count={providersCount}
                    t={t}
                  />
                )
                : (
                  <Typography variant="display1">
                    { t('NO_PROVIDERS_AVAILABLE') }
                  </Typography>
                )
            )
        }

        {
          !!selectedProviderInfo
            ? (
              <ProviderForm
                initialValues={selectedProviderInfo}
                isLoading={isLoading}
                onClose={() => this.toggleSelectProvider(null)}
                onSubmit={this.onSaveProvider}
                t={t}
              />
            )
            : null
        }
      </div>
    );
  }
}

Providers.propTypes = {
  getProviders: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  providerInfoList: PropTypes.array.isRequired,
  providersCount: PropTypes.any,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  isLoading: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    providerInfoList: state.admin.providerInfoList,
    providersCount: state.admin.providersCount,
    pageNumber: state.admin.providersPageNumber,
    pageSize: state.admin.providersPageSize,
    selectedProviderInfo: state.admin.selectedProviderInfo,
    isLoading: state.admin.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProviders: (params) => dispatch(getProviders(params)),
    saveProvider: (data) => dispatch(saveProvider(data)),
    selectProviderInfo: (data) => dispatch(selectProviderInfo(data)),
    deselectProviderInfo: () => dispatch(deselectProviderInfo()),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Providers);

const withTranslate = translate('common')(withConnect);

export default withTranslate;
