/**
 * Created by vladtomsa on 28/11/2018
 */
import { providerConstants } from 'constants/provider';

const initialState = {
  isLoading: null,
  providerServiceInfoList: [],
  selectedProviderServiceInfo: null,
  selectedServiceForInactivate: null,
};

export default (state = initialState, { type, payload }) => {
  if (type.includes(providerConstants.ON_INACTIVATE_SERVICE)) {
    return { ...state, isLoading: type }
  }

  switch (type) {
    case (providerConstants.ON_GET_PROVIDER_SERVICES_INIT):
    case (providerConstants.ON_CREATE_PROVIDER_SERVICE_INIT):
      return { ...state, isLoading: type };

    case (providerConstants.ON_GET_PROVIDER_SERVICES_SUCCESS):
      return { ...state, providerServiceInfoList: payload, isLoading: null };

    case (providerConstants.ON_SELECT_PROVIDER_SERVICE_INFO):
      return { ...state, selectedProviderServiceInfo: payload };
    case (providerConstants.ON_DESELECT_PROVIDER_SERVICE_INFO):
      return { ...state, selectedProviderServiceInfo: null };
    case (providerConstants.ON_INACTIVATE_SERVICE_SELECT):
      return { ...state, selectedServiceForInactivate: payload };
    case (providerConstants.ON_INACTIVATE_SERVICE_DESELECT):
      return { ...state, selectedServiceForInactivate: null };

    case (providerConstants.ON_CREATE_PROVIDER_SERVICE_SUCCESS):
    case (providerConstants.ON_GET_PROVIDER_SERVICES_FAILURE):
    case (providerConstants.ON_CREATE_PROVIDER_SERVICE_FAILURE):
    case (providerConstants.ON_INACTIVATE_SERVICE_DONE):
      return { ...state, isLoading: null };
    default:
      return state;
  }
};
