/**
 * Created by vladtomsa on 28/11/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {
  getProviderServices,
  saveProviderService,
  selectProviderServiceInfo,
  deselectProviderServiceInfo,
  inactivateService,
  selectServiceForInactivate,
  deselectServiceForInactivate,
} from 'actions/provider';
import Loading from 'components/Loading';
import {providerConstants} from 'constants/provider';
import ServiceList from './List';
import ServiceForm from './Form';
import InactivateServiceForm from './Form/InactivateServiceForm';


class ProviderServices extends Component {

  componentDidMount() {
    this.getProviderServices();
  };

  getProviderServices = () => {
    const {getProviderServices, userInfo: {personaAddress}} = this.props;

    getProviderServices(personaAddress);
  };

  onCreateProviderServiceInit = () => {
    const initialServiceInfo = {};

    this.toggleSelectProviderService(initialServiceInfo);
  };

  toggleSelectProviderService = (serviceInfo) => {
    const {selectProviderServiceInfo, deselectProviderServiceInfo} = this.props;

    if (!!serviceInfo) {
      selectProviderServiceInfo(serviceInfo)
    }
    else {
      deselectProviderServiceInfo();
    }
  };

  onInactivateServiceInit = (service) => {
    this.props.selectServiceForInactivate(service);
  };

  onInactivateServiceSubmit = ({ passphrase }) => {
    const { inactivateService, selectedServiceForInactivate } = this.props;

    inactivateService(selectedServiceForInactivate, passphrase)
  };

  onSaveProviderService = ({name, description, passphrase}) => {
    this.props.saveProviderService(
      {
        name,
        description,
      },
      passphrase,
    );
  };

  render() {
    const {
      deselectServiceForInactivate,
      isLoading,
      providerServiceInfoList,
      selectedProviderServiceInfo,
      selectedServiceForInactivate,
      t,
    } = this.props;

    return (
      <div>
        <br/>
        <div className="flex space-between">
          <Typography variant="display1">
            {t('MY_SERVICES')}
          </Typography>

          <Button
            onClick={this.onCreateProviderServiceInit}
            variant="contained"
            color="secondary"
          >
            {t('CREATE')}
          </Button>
        </div>
        <br/>
        <Divider/>
        <br/>

        {
          isLoading === providerConstants.ON_GET_PROVIDER_SERVICES_INIT
            ? <Loading/>
            : (
              providerServiceInfoList
                ? (
                  <ServiceList
                    isLoading={isLoading}
                    onInactivateService={this.onInactivateServiceInit}
                    providerServiceInfoList={providerServiceInfoList}
                    t={t}
                  />
                )
                : null
            )
        }


        {
          !!selectedProviderServiceInfo
            ? (
              <ServiceForm
                initialValues={selectedProviderServiceInfo}
                isLoading={isLoading}
                onClose={() => this.toggleSelectProviderService(null)}
                onSubmit={this.onSaveProviderService}
                t={t}
              />
            )
            : null
        }

        {
          !!selectedServiceForInactivate
            ? (
              <InactivateServiceForm
                serviceInfo={selectedServiceForInactivate}
                isLoading={isLoading}
                onClose={deselectServiceForInactivate}
                onSubmit={this.onInactivateServiceSubmit}
                t={t}
              />
            )
            : null
        }
      </div>
    );
  }
}

ProviderServices.propTypes = {
  saveProviderService: PropTypes.func.isRequired,
  deselectProviderServiceInfo: PropTypes.func.isRequired,
  getProviderServices: PropTypes.func.isRequired,
  isLoading: PropTypes.any,
  providerServiceInfoList: PropTypes.array.isRequired,
  selectProviderServiceInfo: PropTypes.func.isRequired,
  selectedProviderServiceInfo: PropTypes.any,
  t: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.provider.isLoading,
    providerServiceInfoList: state.provider.providerServiceInfoList,
    selectedProviderServiceInfo: state.provider.selectedProviderServiceInfo,
    selectedServiceForInactivate: state.provider.selectedServiceForInactivate,
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProviderService: (data, passphrase) => dispatch(saveProviderService(data, passphrase)),
    deselectProviderServiceInfo: () => dispatch(deselectProviderServiceInfo()),
    getProviderServices: (address) => dispatch(getProviderServices(address)),
    selectProviderServiceInfo: (data) => dispatch(selectProviderServiceInfo(data)),
    inactivateService: (data, passphrase) => dispatch(inactivateService(data, passphrase)),
    selectServiceForInactivate: (data) => dispatch(selectServiceForInactivate(data)),
    deselectServiceForInactivate: () => dispatch(deselectServiceForInactivate()),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ProviderServices);

const withTranslate = translate('common')(withConnect);

export default withTranslate;
