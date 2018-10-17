/**
 * Created by vladtomsa on 09/10/2018
 */
import { blockchain } from 'config/http';
import { attributesConstants } from 'constants/attributes';
import { getBlockchainAccount } from './blockchainAccount';
import { onNotificationErrorInit, onNotificationSuccessInit } from './notifications';
import { getPublicKey } from 'helpers/personaService';
import moment from 'moment';
import personajs from 'personajs';

const extractInfo = (attributeTypes) => {
  return attributeTypes.map((attribute) => {
    attribute.options = JSON.parse(attribute.options) || {};
    attribute.validation = JSON.parse(attribute.validation) || {};

    if (attribute.name === 'date_of_birth') {
      attribute.options.maxDate = moment().toDate();
      attribute.options.openToYearSelection = true;
    }

    return attribute;
  });
};

const createAttributeInfo = (attributeData, passphrase, state) => {
  const { blockchainAccount: { userBlockchainAccount: { address, publicKey } } } = state;

  const encryptedValue = personajs.crypto
    .encrypt(attributeData.value, passphrase)
    .toString();

  const attributInfo = {
    secret: passphrase,
    publicKey: publicKey || getPublicKey(passphrase),
    asset: {
      attribute: [
        {
          ...attributeData,
          value: encryptedValue,
          owner: address,
        }
      ],
    },
  };

  return attributInfo;
};

export const getUserAttributes = (address) =>  async (dispatch) => {
  try {
    dispatch(getUserAttributesInit());

    const { attributes } = await blockchain.get(`/attributes?owner=${address}`);

    dispatch(getUserAttributesSuccess(attributes));
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(getUserAttributesFailure());
  }
};

export const createUserAttribute = (attributeData, passphrase) => async (dispatch, getState) => {
  try {
    dispatch(createUserAttributesInit());
    const state = getState();
    const { blockchainAccount: { userBlockchainAccount: { address } } } = state;
    const postData = createAttributeInfo(attributeData, passphrase, state);

    await blockchain.post(`/attributes`, postData);

    dispatch(waitForUserAttributes(address));
    dispatch(createUserAttributesSuccess(postData));
    dispatch(onNotificationSuccessInit('Attribute added successfully'));

    return true;
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(createUserAttributesFailure());
  }
};

export const getAttributeTypes = () =>  async (dispatch) => {
  try {
    dispatch(getAttributeTypesInit());

    const { attribute_types } = await blockchain.get('/attributes/types/list');

    dispatch(getAttributeTypesSuccess(extractInfo(attribute_types)));
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(getAttributeTypesFailure());
  }
};

export const getFileAttribute = (hash) => async (dispatch) => {
  try {
    dispatch(getFileAttributeInit());

    const { fileData } = await blockchain.get(`/ipfs/fileByHash?hash=${hash}`);

    dispatch(getFileAttributeSuccess(fileData));

    return fileData;
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(getFileAttributeFailure());

    return false;
  }
};

export const deselectFileAttribute = () => ({ type: attributesConstants.ON_DESELECT_FILE_ATTRIBUTE });

const waitForUserAttributes = (address) => async (dispatch) => {
  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  dispatch(getUserAttributesInit());

  await timeout(10 * 1000); // await forging block

  dispatch(getUserAttributes(address));
  dispatch(getBlockchainAccount(address));
};

const getAttributeTypesInit = () => ({ type: attributesConstants.ON_GET_ATTRIBUTE_TYPES_INIT });
const getAttributeTypesSuccess = (data) => ({ type: attributesConstants.ON_GET_ATTRIBUTE_TYPES_SUCCESS, payload: data });
const getAttributeTypesFailure = () => ({ type: attributesConstants.ON_GET_ATTRIBUTE_TYPES_FAILURE });

const getUserAttributesInit = () => ({ type: attributesConstants.ON_GET_USER_ATTRIBUTES_INIT });
const getUserAttributesSuccess = (data) => ({ type: attributesConstants.ON_GET_USER_ATTRIBUTES_SUCCESS, payload: data });
const getUserAttributesFailure = () => ({ type: attributesConstants.ON_GET_USER_ATTRIBUTES_FAILURE });

const createUserAttributesInit = () => ({ type: attributesConstants.ON_CREATE_USER_ATTRIBUTES_INIT });
const createUserAttributesSuccess = (data) => ({ type: attributesConstants.ON_CREATE_USER_ATTRIBUTES_SUCCESS, payload: data });
const createUserAttributesFailure = () => ({ type: attributesConstants.ON_CREATE_USER_ATTRIBUTES_FAILURE });

const getFileAttributeInit = () => ({ type: attributesConstants.ON_GET_FILE_ATTRIBUTE_INIT });
const getFileAttributeSuccess = (data) => ({ type: attributesConstants.ON_GET_FILE_ATTRIBUTE_SUCCESS, payload: data });
const getFileAttributeFailure = () => ({ type: attributesConstants.ON_GET_FILE_ATTRIBUTE_FAILURE });
