/**
 * Created by vladtomsa on 01/10/2018
 */
import { http } from 'config/http';
import { Base64 } from 'js-base64';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
import { getUserAttributes, getValidatorValidationRequests } from './attributes';
import { getBlockchainAccount } from './blockchainAccount';
import { registerUserToChat, leaveChat } from './chat';
import { getInvitations } from './invitations';
import { getFavoriteNotaries } from './notaries';
import { onNotificationSuccessInit, onNotificationErrorInit } from './notifications';
import {
  authConstants,
  USER_LOGIN_TOKEN_STORAGE_KEY,
  USER_INFO_STORAGE_KEY,
  REMEMBER_ME_STORAGE_KEY,
} from 'constants/auth';

import { USER_ROLES } from 'constants/index';

const getCurrentStorage = () => {
  return localStorage.getItem(REMEMBER_ME_STORAGE_KEY) ? localStorage : sessionStorage;
};

export const createAccount = (data) => async (dispatch) => {
  try {
    dispatch(createAccountInit());

    await http.post('/users', data);

    dispatch(createAccountSuccess());
    dispatch(reset('RegisterForm'));
    dispatch(onNotificationSuccessInit('Success! In order to complete your account an email was sent containing final registration link'));
  }
  catch (error) {
    dispatch(createAccountFailure(error));
    dispatch(onNotificationErrorInit(error));
  }
};


export const confirmAccount = (data) => async (dispatch) => {
  try {
    dispatch(confirmAccountInit());

    const response = await http.put('/users/confirm', data);

    dispatch(confirmAccountSuccess());
    dispatch(onNotificationSuccessInit('Account confirmed'));

    return response;
  }
  catch (error) {
    dispatch(confirmAccountFailure());
    dispatch(onNotificationErrorInit(error));
  }
};

export const updateAccount = (data) => async (dispatch) => {
  try {
    dispatch(updateAccountInit());

    await http.put('/users/' + data.id, data);

    const userInfo = await http.get('/users/' + data.id);

    dispatch(loginSuccess(userInfo));
    dispatch(onNotificationSuccessInit('Account updated successfully'));
  }
  catch (error) {
    dispatch(updateAccountFailure(error));
    dispatch(onNotificationErrorInit(error));
  }
};

export const login = ({ username, password, rememberMe }) => async (dispatch, getState) => {
  try {
    dispatch(loginInit());

    const loginToken = Base64.encode(`${username}:${password}`);
    http.defaults.headers.common['Authorization'] = `Basic ${loginToken}`;

    const userInfo = await http.get('/users/login');

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem(REMEMBER_ME_STORAGE_KEY, true);
    storage.setItem(USER_LOGIN_TOKEN_STORAGE_KEY, loginToken);

    dispatch(loginSuccess(userInfo));

    const { router: { location: { pathname } } } = getState();

    if (pathname === '/login') {
      dispatch(onNotificationSuccessInit({ message: `Welcome ${userInfo.username}` }));
      dispatch(push('/dashboard'));
    }
  }
  catch (error) {
    dispatch(loginFailure());
    dispatch(onNotificationErrorInit(error));
  }
};

export const logout = () => (dispatch) => {
  const storage = getCurrentStorage();

  storage.removeItem(USER_INFO_STORAGE_KEY);
  storage.removeItem(REMEMBER_ME_STORAGE_KEY);
  storage.removeItem(USER_LOGIN_TOKEN_STORAGE_KEY);

  dispatch(push('/'));
  dispatch(leaveChat());
  dispatch(logoutInit());
};

export const isLoggedIn = () => (dispatch, getState) => {
  const { router: { location: { pathname } } } = getState();

  if (!pathname.includes('/account/confirmation')) {
    const userInfo = localStorage.getItem(USER_INFO_STORAGE_KEY) ||
      sessionStorage.getItem(USER_INFO_STORAGE_KEY);

    if (userInfo) {
      const loginToken = localStorage.getItem(USER_LOGIN_TOKEN_STORAGE_KEY) ||
        sessionStorage.getItem(USER_LOGIN_TOKEN_STORAGE_KEY);

      http.defaults.headers.common['Authorization'] = `Basic ${loginToken}`;

      // dispatch(loginSuccess(JSON.parse(userInfo)));

      const [username, password] = Base64.decode(loginToken).split(':');

      dispatch(login({ username, password }));
    }
  }
};


const createAccountInit = () => ({ type: authConstants.ON_CREATE_ACCOUNT_INIT });
const createAccountSuccess = () => ({ type: authConstants.ON_CREATE_ACCOUNT_SUCCESS });
const createAccountFailure = (error) => ({ type: authConstants.ON_CREATE_ACCOUNT_FAILURE, payload: error });

const confirmAccountInit = () => ({ type: authConstants.ON_CONFIRM_ACCOUNT_INIT });
const confirmAccountSuccess = () => ({ type: authConstants.ON_CONFIRM_ACCOUNT_SUCCESS });
const confirmAccountFailure = () => ({ type: authConstants.ON_CONFIRM_ACCOUNT_FAILURE });
const updateAccountInit = () => ({ type: authConstants.ON_UPDATE_ACCOUNT_INIT });
const updateAccountFailure = () => ({ type: authConstants.ON_UPDATE_ACCOUNT_FAILURE });

const loginInit = () => ({ type: authConstants.ON_LOGIN_INIT });
const loginSuccess = (data) => async (dispatch) => {
  const storage = getCurrentStorage();

  storage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(data));

  const personaAddress = data.personaAddress;

  if (personaAddress) {
    dispatch(registerUserToChat(data));
    dispatch(getUserAttributes(personaAddress));
    dispatch(getBlockchainAccount(personaAddress));
    dispatch(getFavoriteNotaries());

    // if logged in user is a notary, fetch his validation requests
    if (data && data.userRoleId === USER_ROLES.NOTARY) {
      dispatch(getValidatorValidationRequests({ validator: personaAddress }));
    }

    // getUserInvitations
    if (data && data.referralInfo) {
      dispatch(getInvitations(data.referralInfo.referralCode));
    }

    dispatch({ type: authConstants.ON_LOGIN_SUCCESS, payload: data });
  }
};
const loginFailure = () => ({ type: authConstants.ON_LOGIN_FAILURE });

export const logoutInit = () => ({ type: authConstants.ON_LOGOUT });
