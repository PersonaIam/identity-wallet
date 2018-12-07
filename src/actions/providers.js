/**
 * Created by vladtomsa on 29/11/2018
 */
import {http, blockchain} from 'config/http';
import {providersConstants} from 'constants/providers';
import {onNotificationErrorInit} from './notifications';

export const getProviders = (params) => async (dispatch) => {
  try {
    dispatch(getProvidersInit(params));

    params.isActive = true;

    const {count, userInfoList} = await http.get(`/providers`, {params});

    dispatch(getProvidersSuccess({
      providerInfoList: userInfoList,
      providersCount: count,
    }));

    return true;
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(getProvidersFailure());

    return false;
  }
};

export const getProviderByAddress = (personaAddress) => async (dispatch) => {
  try {
    dispatch(getProviderByAddressInit());

    const {userInfoList} = await http.get(`/providers`, {
        params: {
          isActive: true,
          personaAddress,
        }
      }
    );

    const provider = userInfoList[0];

    const {services} = await blockchain.get('/services', {
      params: {
        provider: personaAddress,
      },
    });

    provider.services = services;

    dispatch(getProviderByAddressSuccess(provider));

    return true;
  }
  catch (error) {
    dispatch(onNotificationErrorInit('CANNOT_RETRIEVE_INFORMATION_ABOUT_SPECIFIED_PROVIDER'));
    dispatch(getProviderByAddressFailure());

    return false;
  }
};

const getProvidersInit = (params) => ({type: providersConstants.ON_GET_PROVIDERS_INIT, payload: params});
const getProvidersSuccess = (data) => ({type: providersConstants.ON_GET_PROVIDERS_SUCCESS, payload: data});
const getProvidersFailure = () => ({type: providersConstants.ON_GET_PROVIDERS_FAILURE});

const getProviderByAddressInit = () => ({type: providersConstants.ON_GET_PROVIDER_BY_ADDRESS_INIT});
const getProviderByAddressSuccess = (data) => ({
  type: providersConstants.ON_GET_PROVIDER_BY_ADDRESS_SUCCESS,
  payload: data
});
const getProviderByAddressFailure = () => ({type: providersConstants.ON_GET_PROVIDER_BY_ADDRESS_FAILURE});
