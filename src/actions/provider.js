/**
 * Created by vladtomsa on 28/11/2018
 */
import {blockchain} from 'config/http';
import {providerConstants} from 'constants/provider';
import {onNotificationErrorInit, onNotificationSuccessInit} from './notifications';
import {getPublicKey, personaStampToDate} from 'helpers/personaService';

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getProviderServices = (address) => async (dispatch) => {
  try {
    dispatch(getProviderServicesInit());

    const {services} = await blockchain.get('/services', {
      params: {
        provider: address,
      },
    });

    dispatch(getProviderServicesSuccess(services.map(service => ({
      ...service,
      timestamp: personaStampToDate(service.timestamp)
    }))));
  }
  catch (e) {
    dispatch(onNotificationErrorInit(e));
    dispatch(getProviderServicesFailure());
  }
};

export const saveProviderService = (data, passphrase) => async (dispatch, getState) => {
  try {
    dispatch(saveProviderServicesInit());
    const state = getState();
    const {blockchainAccount: {userBlockchainAccount: {address}}} = state;

    const serviceInfo = createServiceInfo(data, passphrase, state);

    await blockchain.post('/services', serviceInfo);

    await timeout(10 * 1000); // await forging block

    dispatch(deselectProviderServiceInfo());
    dispatch(saveProviderServicesSuccess());
    dispatch(onNotificationSuccessInit('SERVICE_SAVED_SUCCESSFULLY'));
    dispatch(getProviderServices(address));
  }
  catch (e) {
    dispatch(onNotificationErrorInit(e));
    dispatch(saveProviderServicesFailure());
  }
};

export const inactivateService = (data, passphrase) => async (dispatch, getState) => {
  try {
    dispatch(inactivateServiceInit(data.id));
    const state = getState();
    const {blockchainAccount: {userBlockchainAccount: {address}}} = state;

    const inactivateServiceInfo = createInactivateServiceInfo(data, passphrase, state);

    await blockchain.put('/services/inactivate', inactivateServiceInfo);

    await (timeout(10 * 1000));

    dispatch(inactivateServiceDone());
    dispatch(deselectServiceForInactivate());
    dispatch(onNotificationSuccessInit('SERVICE_INACTIVATED_SUCCESSFULLY'));
    dispatch(getProviderServices(address));
  }
  catch (e) {
    dispatch(onNotificationErrorInit(e));
    dispatch(inactivateServiceDone());
  }
};

const createInactivateServiceInfo = (serviceData, passphrase, state) => {
  const {blockchainAccount: {userBlockchainAccount: {address, publicKey}}} = state;
  const {name} = serviceData;

  const serviceInfo = {
    secret: passphrase,
    publicKey: publicKey || getPublicKey(passphrase),
    asset: {
      service: {
        name,
        provider: address
      }
    }
  };

  return serviceInfo;
};

const createServiceInfo = (serviceData, passphrase, state) => {
  const {blockchainAccount: {userBlockchainAccount: {address, publicKey}}} = state;
  const {name, description, attributeTypes} = serviceData;

  const serviceInfo = {
    secret: passphrase,
    publicKey: publicKey || getPublicKey(passphrase),
    asset: {
      service: {
        name,
        description,
        attributeTypes,
        provider: address,
      }
    }
  };

  return serviceInfo;
};

const getProviderServicesInit = () => ({type: providerConstants.ON_GET_PROVIDER_SERVICES_INIT});
const getProviderServicesSuccess = (data) => ({
  type: providerConstants.ON_GET_PROVIDER_SERVICES_SUCCESS,
  payload: data
});
const getProviderServicesFailure = () => ({type: providerConstants.ON_GET_PROVIDER_SERVICES_FAILURE});

const saveProviderServicesInit = () => ({type: providerConstants.ON_CREATE_PROVIDER_SERVICE_INIT});
const saveProviderServicesSuccess = () => ({type: providerConstants.ON_CREATE_PROVIDER_SERVICE_SUCCESS});
const saveProviderServicesFailure = () => ({type: providerConstants.ON_CREATE_PROVIDER_SERVICE_FAILURE});


export const selectProviderServiceInfo = (data) => ({
  type: providerConstants.ON_SELECT_PROVIDER_SERVICE_INFO,
  payload: data
});
export const deselectProviderServiceInfo = () => ({type: providerConstants.ON_DESELECT_PROVIDER_SERVICE_INFO});

export const inactivateServiceInit = (serviceId) => ({type: `${ providerConstants.ON_INACTIVATE_SERVICE }_${serviceId}`});
export const inactivateServiceDone = () => ({type: providerConstants.ON_INACTIVATE_SERVICE_DONE});
export const selectServiceForInactivate = (data) => ({
  type: providerConstants.ON_INACTIVATE_SERVICE_SELECT,
  payload: data
});
export const deselectServiceForInactivate = () => ({type: providerConstants.ON_INACTIVATE_SERVICE_DESELECT});
