/**
 * Created by vladtomsa on 22/11/2018
 */
import { administrationsConstants } from 'constants/administration';

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
    case (administrationsConstants.ON_GET_ADMIN_PROVIDERS_INIT):
      return { ...state, isLoading: administrationsConstants.ON_GET_ADMIN_PROVIDERS_INIT, providersPageNumber: payload.pageNumber, providersPageSize: payload.pageSize };
    case (administrationsConstants.ON_GET_ADMIN_PROVIDERS_SUCCESS):
      return { ...state, isLoading: null, providerInfoList: payload.providerInfoList, providersCount: payload.providersCount };
    case (administrationsConstants.ON_GET_ADMIN_PROVIDERS_FAILURE):
      return { ...state, isLoading: null };
    case (administrationsConstants.ON_SAVE_ADMIN_PROVIDERS_INIT):
      return { ...state, isLoading: administrationsConstants.ON_SAVE_ADMIN_PROVIDERS_INIT };
    case (administrationsConstants.ON_SAVE_ADMIN_PROVIDERS_SUCCESS):
    case (administrationsConstants.ON_SAVE_ADMIN_PROVIDERS_FAILURE):
      return { ...state, isLoading: null };
    case (administrationsConstants.ON_SELECT_PROVIDER):
      return { ...state, selectedProviderInfo: payload };
    case (administrationsConstants.ON_DESELECT_PROVIDER):
      return { ...state, selectedProviderInfo: null };
    case (administrationsConstants.ON_RESET_ADMIN_PROVIDERS):
      return { ...state, ...initialState };
    default:
      return state;
  }
}
