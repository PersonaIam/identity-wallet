/**
 * Created by vladtomsa on 29/11/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {getProviders} from 'actions/providers';
import {providersConstants} from 'constants/providers';
import Loading from 'components/Loading';
import ProvidersList from './List';
import styles from './styles';

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
    });
  };

  render() {
    const {goToProvider, isLoading, providerInfoList, providersCount, pageNumber, pageSize, t} = this.props;

    return (
      <div>
        <br />
        <div className='flex space-between'>
          <Typography variant='display1' gutterBottom>
            { t('PROVIDERS') }
          </Typography>
        </div>
        <Divider/>
        <br />

        {
          isLoading === providersConstants.ON_GET_PROVIDERS_INIT
            ? (
              <Loading />
            )
            : (
              providerInfoList && providerInfoList.length
                ? (
                  <ProvidersList
                    onChange={this.getProviders}
                    onProviderSelect={(provider) => goToProvider(provider.personaAddress)}
                    providerInfoList={providerInfoList}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    count={providersCount}
                    t={t}
                  />
                )
                : (
                  <Typography variant='display1'>
                    { t('NO_PROVIDERS_AVAILABLE') }
                  </Typography>
                )
            )
        }
      </div>
    );
  }
}

Providers.propTypes = {
  providerInfoList: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  providersCount: PropTypes.any,
  selectedProviderInfo: PropTypes.any,
  isLoading: PropTypes.any,
  getProviders: PropTypes.func.isRequired,
  goToProvider: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    providerInfoList: state.providers.providerInfoList,
    providersCount: state.providers.providersCount,
    pageNumber: state.providers.providersPageNumber,
    pageSize: state.providers.providersPageSize,
    selectedProviderInfo: state.providers.selectedProviderInfo,
    isLoading: state.providers.isLoading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProviders: (params) => dispatch(getProviders(params)),
    goToProvider: (personaAddress) => dispatch(push(`/providers/${personaAddress}`))
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Providers);

const withTranslate = translate('common')(withConnect);

const withStyle = withStyles(styles)(withTranslate);

export default withStyle;
