/**
 * Created by vladtomsa on 29/11/2018
 */
import { providersConstants } from 'constants/providers';

const initialState = {
  providerInfoList: [],
  providersCount: null,
  providersPageNumber: 0,
  providersPageSize: 25,
  selectedProviderInfo: null,
  isLoading: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case (providersConstants.ON_GET_PROVIDERS_INIT):
      return { ...state, isLoading: providersConstants.ON_GET_PROVIDERS_INIT, providersPageNumber: payload.pageNumber, providersPageSize: payload.pageSize };
    case (providersConstants.ON_GET_PROVIDERS_SUCCESS):
      return { ...state, isLoading: null, providerInfoList: payload.providerInfoList, providersCount: payload.providersCount };

    case (providersConstants.ON_GET_PROVIDER_BY_ADDRESS_INIT):
      return { ...state, isLoading: providersConstants.ON_GET_PROVIDER_BY_ADDRESS_INIT, selectedProviderInfo: null };

    case (providersConstants.ON_GET_PROVIDER_BY_ADDRESS_SUCCESS):
      return { ...state, isLoading: null, selectedProviderInfo: payload };

    case (providersConstants.ON_GET_PROVIDER_BY_ADDRESS_FAILURE):
    case (providersConstants.ON_GET_PROVIDERS_FAILURE):
      return { ...state, isLoading: null };
    default:
      return state;
  }
}
