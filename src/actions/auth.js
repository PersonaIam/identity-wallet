/**
 * Created by vladtomsa on 01/10/2018
 */
import { http } from 'config/http';
import { Base64 } from 'js-base64';
import { push } from 'react-router-redux';
import { getUserAttributes } from './attributes';
import { getBlockchainAccount } from './blockchainAccount';
import { onNotificationSuccessInit, onNotificationErrorInit } from './notifications';
import {
  authConstants,
  USER_LOGIN_TOKEN_STORAGE_KEY,
  USER_INFO_STORAGE_KEY,
  REMEMBER_ME_STORAGE_KEY,
} from 'constants/auth';


export const createAccount = (data) => async (dispatch) => {
  try {
    dispatch(createAccountInit());

    await http.post('/users', data);

    dispatch(createAccountSuccess());
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



export const login = ({ username, password, rememberMe }) => async (dispatch) => {
  try {
    dispatch(loginInit());

    const loginToken = Base64.encode(`${username}:${password}`);
    http.defaults.headers.common['Authorization'] = `Basic ${loginToken}`;

    const userInfo = await http.get('/users/login');

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(userInfo));
    storage.setItem(USER_LOGIN_TOKEN_STORAGE_KEY, loginToken);
    storage.setItem(REMEMBER_ME_STORAGE_KEY, true);

    dispatch(loginSuccess(userInfo));
    dispatch(onNotificationSuccessInit({ message: `Welcome ${userInfo.username}` }));
    dispatch(push('/dashboard'));
  }
  catch (error) {
    dispatch(loginFailure());
    dispatch(onNotificationErrorInit(error));
  }
};

export const logout = () => (dispatch) => {
  const storage = localStorage.getItem(REMEMBER_ME_STORAGE_KEY) ? localStorage : sessionStorage;

  storage.removeItem(USER_INFO_STORAGE_KEY);
  storage.removeItem(REMEMBER_ME_STORAGE_KEY);
  storage.removeItem(USER_LOGIN_TOKEN_STORAGE_KEY);

  dispatch(push('/'));
  dispatch(logoutInit());
};

export const isLoggedIn = () => (dispatch) => {
  const userInfo = localStorage.getItem(USER_INFO_STORAGE_KEY) ||
    sessionStorage.getItem(USER_INFO_STORAGE_KEY);

  if (userInfo) {
    const loginToken = localStorage.getItem(USER_LOGIN_TOKEN_STORAGE_KEY) ||
      sessionStorage.getItem(USER_LOGIN_TOKEN_STORAGE_KEY);

    http.defaults.headers.common['Authorization'] = `Basic ${loginToken}`;

    dispatch(loginSuccess(JSON.parse(userInfo)));
  }
};


const createAccountInit = () => ({ type: authConstants.ON_CREATE_ACCOUNT_INIT });
const createAccountSuccess = () => ({ type: authConstants.ON_CREATE_ACCOUNT_SUCCESS });
const createAccountFailure = (error) => ({ type: authConstants.ON_CREATE_ACCOUNT_FAILURE, payload: error });

const confirmAccountInit = () => ({ type: authConstants.ON_CONFIRM_ACCOUNT_INIT });
const confirmAccountSuccess = () => ({ type: authConstants.ON_CONFIRM_ACCOUNT_SUCCESS });
const confirmAccountFailure = () => ({ type: authConstants.ON_CONFIRM_ACCOUNT_FAILURE });

const loginInit = () => ({ type: authConstants.ON_LOGIN_INIT });
const loginSuccess = (data) => async (dispatch) => {
  const personaAddress = data.personaAddress;

  dispatch(getUserAttributes(personaAddress));
  dispatch(getBlockchainAccount(personaAddress));

  dispatch({ type: authConstants.ON_LOGIN_SUCCESS, payload: data });
};
const loginFailure = () => ({ type: authConstants.ON_LOGIN_FAILURE });

export const logoutInit = () => ({ type: authConstants.ON_LOGOUT });
