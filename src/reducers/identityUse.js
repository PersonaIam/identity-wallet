/**
 * Created by vladtomsa on 03/12/2018
 */
import { identityUseConstants } from 'constants/identityUse';

const initialState = {
  identityUseRequestInfoList: [],
  selectedServiceForIdentityUse: null,
  isLoading: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case (identityUseConstants.GET_IDENTITY_USE_REQUEST_INIT):
      return { ...state, isLoading: identityUseConstants.GET_IDENTITY_USE_REQUEST_INIT };
    case (identityUseConstants.GET_IDENTITY_USE_REQUEST_SUCCESS):
      return { ...state, isLoading: null, identityUseRequestInfoList: payload };

    case (identityUseConstants.ON_SELECT_SERVICE_FOR_IDENTITY_USE):
      return { ...state, selectedServiceForIdentityUse: payload };
    case (identityUseConstants.ON_DESELECT_SERVICE_FOR_IDENTITY_USE):
      return { ...state, selectedServiceForIdentityUse: null };

    case (identityUseConstants.CREATE_IDENTITY_USE_REQUEST_INIT):
      return { ...state, isLoading: payload };

    case (identityUseConstants.CREATE_IDENTITY_USE_REQUEST_SUCCESS):
    case (identityUseConstants.CREATE_IDENTITY_USE_REQUEST_FAILURE):
    case (identityUseConstants.GET_IDENTITY_USE_REQUEST_FAILURE):
    case (identityUseConstants.ON_IDENTITY_USE_UPDATE_DONE):
      return { ...state, isLoading: null };

    case (identityUseConstants.ON_IDENTITY_USE_UPDATE_INIT):
      return { ...state, isLoading: identityUseConstants.ON_IDENTITY_USE_UPDATE_INIT };

    case (identityUseConstants.RESET_IDENTITY_REQUESTS):
      return initialState;

    default:
      return state;
  }
}
