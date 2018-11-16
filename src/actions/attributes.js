/**
 * Created by vladtomsa on 09/10/2018
 */
import { blockchain } from 'config/http';
import { VALIDATION_REQUEST_ACTION } from 'constants/index';
import { attributesConstants } from 'constants/attributes';
import { getBlockchainAccount } from './blockchainAccount';
import { onNotificationErrorInit, onNotificationSuccessInit } from './notifications';
import { getPublicKey } from 'helpers/personaService';
import moment from 'moment';
import personajs from 'personajs';

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

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
    dispatch(getValidationRequestsSentByUser(address));

    const { attributes } = await blockchain.get(`/attributes?owner=${address}`);

    attributes.forEach((attribute) => {
      attribute.attributeAssociations  = attributes
        .filter(attr => {
          const associations = JSON.parse(attr.associations) || [];

          return !!associations.includes(attribute.id)
        });
    });

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

    const httpMethod = attributeData.attributeId ? blockchain.put : blockchain.post;

    await httpMethod(`/attributes`, postData);

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

export const createAttributeValidationRequest = (data) => async (dispatch, getState) => {
  try {
    dispatch(createValidationRequestInit());
    const state = getState();
    const { secret, asset } = data;
    const valiation = asset.validation[0];
    const { blockchainAccount: { userBlockchainAccount: { address, publicKey } } } = state;

    valiation.owner = address;

    const postData = {
      secret,
      publicKey: publicKey || getPublicKey(secret),
      asset,
    };


    await blockchain.post(`/attribute-validations/validationrequest`, postData);

    dispatch(waitForUserAttributes(address));
    dispatch(createValidationRequestSuccess(postData));
    dispatch(onNotificationSuccessInit('Validation request created successfully'));


    return true;
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(createValidationRequestFailure());

    return false;
  }
};

export const getValidationRequestsSentByUser = (address) => async (dispatch) => {
  try {
    dispatch(getValidationRequestsSentByUserInit());

    const params = {
      owner: address,
    };

    const userValidationRequests = await getValidationRequests(params);

    dispatch(getValidationRequestsSentByUserSuccess(userValidationRequests));
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(getValidationRequestsSentByUserFailure());
  }
};

export const getValidatorValidationRequests = (params) => async (dispatch) => {
  try {
    dispatch(getValidationRequestsInit());

    const validatorValidationRequests = await getValidationRequests(params);

    dispatch(getValidationRequestsSuccess(validatorValidationRequests));
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(getValidationRequestsFailure());
  }
};

const getValidationRequests = async (params) => {
  const { attribute_validation_requests } = await blockchain.get(`/attribute-validations/validationrequest`, { params });

  return attribute_validation_requests;
};


export const handleAttributeRequest = (data, actionType) => async (dispatch, getState) => {
  try {
    dispatch(validationUpdateInit());

    let url;
    const { auth: { userInfo: { personaAddress } } } = getState();

    /* eslint-disable default-case */
    switch (actionType) {
      case (VALIDATION_REQUEST_ACTION.APPROVE):
        url = 'approve';
        break;
      case (VALIDATION_REQUEST_ACTION.DECLINE):
        url = 'decline';
        break;
      case (VALIDATION_REQUEST_ACTION.NOTARIZE):
        url = 'notarize';
        break;
      case (VALIDATION_REQUEST_ACTION.REJECT):
        url = 'reject';
        break;
      case (VALIDATION_REQUEST_ACTION.CANCEL):
        url = 'cancel';
        break;
    }
    /* eslint-enable */

    await blockchain.post(`/attribute-validations/${url}`, {
      ...data,
      publicKey: data.publicKey || getPublicKey(data.secret),
    });

    await timeout(10 * 1000); // await forging block

    dispatch(getValidatorValidationRequests({ validator: personaAddress }));
    dispatch(validationUpdateDone());

    return true;
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(validationUpdateDone());

    return false;
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

const getValidationRequestsInit = () => ({ type: attributesConstants.ON_GET_VALIDATION_REQUESTS_INIT });
const getValidationRequestsSuccess = (data) => ({ type: attributesConstants.ON_GET_VALIDATION_REQUESTS_SUCCESS, payload: data });
const getValidationRequestsFailure = () => ({ type: attributesConstants.ON_GET_VALIDATION_REQUESTS_FAILURE });


const getValidationRequestsSentByUserInit = () => ({ type: attributesConstants.ON_GET_USER_SENT_VALIDATION_REQUESTS_INIT });
const getValidationRequestsSentByUserSuccess = (data) => ({ type: attributesConstants.ON_GET_USER_SENT_VALIDATION_REQUESTS_SUCCESS, payload: data });
const getValidationRequestsSentByUserFailure = () => ({ type: attributesConstants.ON_GET_USER_SENT_VALIDATION_REQUESTS_FAILURE });

const createUserAttributesInit = () => ({ type: attributesConstants.ON_CREATE_USER_ATTRIBUTES_INIT });
const createUserAttributesSuccess = (data) => ({ type: attributesConstants.ON_CREATE_USER_ATTRIBUTES_SUCCESS, payload: data });
const createUserAttributesFailure = () => ({ type: attributesConstants.ON_CREATE_USER_ATTRIBUTES_FAILURE });

const createValidationRequestInit = () => ({ type: attributesConstants.ON_CREATE_VALIDATION_REQUEST_INIT });
const createValidationRequestSuccess = () => ({ type: attributesConstants.ON_CREATE_VALIDATION_REQUEST_SUCCESS });
const createValidationRequestFailure = () => ({ type: attributesConstants.ON_CREATE_VALIDATION_REQUEST_FAILURE });

const getFileAttributeInit = () => ({ type: attributesConstants.ON_GET_FILE_ATTRIBUTE_INIT });
const getFileAttributeSuccess = (data) => ({ type: attributesConstants.ON_GET_FILE_ATTRIBUTE_SUCCESS, payload: data });
const getFileAttributeFailure = () => ({ type: attributesConstants.ON_GET_FILE_ATTRIBUTE_FAILURE });

const validationUpdateInit = (data) => ({ type: attributesConstants.ON_VALIDATION_UPDATE_INIT, payload: data });
const validationUpdateDone = () => ({ type: attributesConstants.ON_VALIDATION_UPDATE_DONE });
