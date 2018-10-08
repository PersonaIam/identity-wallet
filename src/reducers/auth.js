/**
 * Created by vladtomsa on 03/10/2018
 */
import { authConstants } from 'constants/auth';

const initialState = {
  isLoading: null,
  userInfo: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case (authConstants.ON_CONFIRM_ACCOUNT_INIT):
      return { ...state, isLoading: authConstants.ON_CONFIRM_ACCOUNT_INIT };
    case (authConstants.ON_LOGIN_INIT):
      return { ...state, isLoading: authConstants.ON_LOGIN_INIT };
    case (authConstants.ON_LOGIN_SUCCESS):
      return { ...state, isLoading: null, userInfo: payload };
    case (authConstants.ON_CONFIRM_ACCOUNT_SUCCESS):
    case (authConstants.ON_CONFIRM_ACCOUNT_FAILURE):
    case (authConstants.ON_LOGIN_FAILURE):
      return { ...state, isLoading: null };
    case (authConstants.ON_LOGOUT):
      return { ...state, userInfo: null };
    default:
      return state;
  }
}
