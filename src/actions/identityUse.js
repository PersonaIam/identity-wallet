/**
 * Created by vladtomsa on 03/12/2018
 */
import {http, blockchain} from 'config/http';
import {identityUseConstants} from 'constants/identityUse';
import {onNotificationErrorInit, onNotificationSuccessInit} from './notifications';
import {getPublicKey, encryptValue, decryptValue} from "../helpers/personaService";
import {getProviderByAddress} from "./providers";
import {IDENTITY_USE_REQUEST_ACTION} from "../constants";

import personajs from 'personajs';

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getIdentityUseRequests = (params) => async (dispatch) => {
  try {
    dispatch(getIdentityUseRequestsInit());

    const {identity_use_requests} = await blockchain.get('/identity-use', {params});

    const providers = [];

    for (let i = 0; i < identity_use_requests.length; i++) {
      const request = identity_use_requests[i];
      const providerAddress = request.provider;

      const providerInfo = providers.find(p => p.personaAddress === providerAddress);

      if (providerInfo) {
        request.providerInfo = providerInfo;
      }
      else {
        const {userInfoList} = await http.get(`/providers`, {
            params: {
              isActive: true,
              personaAddress: providerAddress,
            }
          }
        );

        request.providerInfo = userInfoList[0];
        providers.push(userInfoList[0]);
      }
    }

    dispatch(getIdentityUseRequestsSuccess(identity_use_requests));
  }
  catch (e) {
    dispatch(onNotificationErrorInit(e));
    dispatch(getIdentityUseRequestsFailure());
  }
};

export const createIdentityUseRequest = (attributes, passphrase) => async (dispatch, getState) => {
  try {
    const state = getState();
    const {
      blockchainAccount: {userBlockchainAccount: {address}},
      providers: {selectedProviderInfo},
      identityUse: {selectedServiceForIdentityUse},
    } = state;

    dispatch(createIdentityUseRequestInit(selectedServiceForIdentityUse.id));


    const identityUseRequest = await createIdentityUseInfo(attributes, passphrase, state);

    await blockchain.post('/identity-use', identityUseRequest);

    await timeout(10 * 1000);

    dispatch(createIdentityUseRequestSuccess());
    dispatch(deselectServiceForIdentityUse());
    dispatch(getIdentityUseRequests({owner: address}));

    if (selectedProviderInfo) {
      const {personaAddress} = selectedProviderInfo;

      dispatch(getProviderByAddress(personaAddress));
    }
  }
  catch (e) {
    debugger;
    dispatch(onNotificationErrorInit(e));
    dispatch(createIdentityUseRequestFailure());
  }
};

const createIdentityUseInfo = async (attributes, passphrase, state) => {
  const {
    blockchainAccount: {userBlockchainAccount: {address, publicKey}},
    identityUse: {selectedServiceForIdentityUse},
  } = state;

  const {name, provider} = selectedServiceForIdentityUse;

  const { account } = await blockchain.get(`/accounts?address=${provider}`);
  const { attribute_types } = await blockchain.get('/attributes/types/list');

  const providerPublicKey = account.publicKey;
  const mappedAttributes = [];

  // for async flow
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];

    let encryptedValue;
    const {type, value} = attribute;
    const attributeTypeInfo = attribute_types.find(a => a.name === type);

    debugger;

    if (attributeTypeInfo.data_type === 'file') {
      const { fileData } = await blockchain.get(`/ipfs/fileByHash?hash=${value}`);

      // ToDo replace with helpers decrypt value
      const plainTextValue = decryptValue(fileData, passphrase);

      encryptedValue = encryptValue(plainTextValue, providerPublicKey);
    }
    else {
      // ToDo replace with helpers decrypt value
      const plainTextValue = decryptValue(value, passphrase);

      encryptedValue = encryptValue(plainTextValue, providerPublicKey);
    }

    mappedAttributes.push({
      type,
      value: encryptedValue,
    });
  }

  const identityUseInfo = {
    secret: passphrase,
    publicKey: publicKey || getPublicKey(passphrase),
    asset: {
      identityuse: [
        {
          owner: address,
          serviceName: name,
          serviceProvider: provider,
          attributes: mappedAttributes,
        },
      ],
    },
  };

  return identityUseInfo;
};


export const handleIdentityUseRequest = (data, actionType) => async (dispatch, getState) => {
  try {
    dispatch(identityUseUpdateInit());

    let url;
    const {auth: {userInfo: {personaAddress}}} = getState();

    /* eslint-disable default-case */
    switch (actionType) {
      case (IDENTITY_USE_REQUEST_ACTION.APPROVE):
        url = 'approve';
        break;
      case (IDENTITY_USE_REQUEST_ACTION.DECLINE):
        url = 'decline';
        break;
      case (IDENTITY_USE_REQUEST_ACTION.END):
        url = 'end';
        break;
      case (IDENTITY_USE_REQUEST_ACTION.CANCEL):
        url = 'cancel';
        break;
    }
    /* eslint-enable */

    await blockchain.post(`/identity-use/${url}`, {
      ...data,
      publicKey: data.publicKey || getPublicKey(data.secret),
    });

    await timeout(10 * 1000); // await forging block

    dispatch(getIdentityUseRequests({serviceProvider: personaAddress}));
    dispatch(onNotificationSuccessInit('REQUEST_UPDATED_SUCCESSFULLY'));
    dispatch(identityUseUpdateDone());

    return true;
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(identityUseUpdateDone());

    return false;
  }
};

export const resetIdentityUseRequests = () => ({
  type: identityUseConstants.RESET_IDENTITY_REQUESTS,
});

export const selectServiceForIdentityUse = (data) => ({
  type: identityUseConstants.ON_SELECT_SERVICE_FOR_IDENTITY_USE,
  payload: data
});

export const deselectServiceForIdentityUse = () => ({
  type: identityUseConstants.ON_DESELECT_SERVICE_FOR_IDENTITY_USE,
});


const createIdentityUseRequestInit = (serviceId) => ({
  type: identityUseConstants.CREATE_IDENTITY_USE_REQUEST_INIT,
  payload: identityUseConstants.CREATE_IDENTITY_USE_REQUEST_INIT + '_' + serviceId,
});

const createIdentityUseRequestSuccess = () => ({
  type: identityUseConstants.CREATE_IDENTITY_USE_REQUEST_SUCCESS,
});

const createIdentityUseRequestFailure = () => ({
  type: identityUseConstants.CREATE_IDENTITY_USE_REQUEST_FAILURE,
});

const getIdentityUseRequestsInit = () => ({
  type: identityUseConstants.GET_IDENTITY_USE_REQUEST_INIT,
});

const getIdentityUseRequestsSuccess = (data) => ({
  type: identityUseConstants.GET_IDENTITY_USE_REQUEST_SUCCESS,
  payload: data,
});

const getIdentityUseRequestsFailure = () => ({
  type: identityUseConstants.GET_IDENTITY_USE_REQUEST_FAILURE,
});

const identityUseUpdateInit = () => ({
  type: identityUseConstants.ON_IDENTITY_USE_UPDATE_INIT,
});

const identityUseUpdateDone = () => ({
  type: identityUseConstants.ON_IDENTITY_USE_UPDATE_DONE,
});

