/**
 * Created by vladtomsa on 22/11/2018
 */
import { http } from 'config/http';
import { administrationsConstants } from 'constants/administration';
import {onNotificationErrorInit, onNotificationSuccessInit} from './notifications';

export const getProviders = (params) =>  async (dispatch) => {
  try {
    dispatch(getProvidersInit(params));

    const { count, userInfoList } = await http.get(`/providers`, { params });

    dispatch(getProvidersSuccess({
      providerInfoList: userInfoList,
      providersCount: count,
    }));

    return true;
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(getProvidersFailure());

    return false;
  }
};

export const saveProvider = (data) => async (dispatch, getState) => {
  try {
    dispatch(saveProvidersInit());

    const url = data.id
      ? `/providers/${data.id}`
      : '/providers';

    const request = data.id ? http.put : http.post;

    await request(url, data);

    dispatch(saveProvidersSuccess());

    dispatch(onNotificationSuccessInit('PROVIDER_SAVED_SUCCESSFULLY'));

    dispatch(deselectProviderInfo());

    const { admin: { providersPageNumber, providersPageSize } } = getState();

    dispatch(getProviders({
      pageNumber: providersPageNumber,
      pageSize: providersPageSize,
    }));
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(saveProvidersFailure());
  }
};

export const selectProviderInfo = (data) => ({ type: administrationsConstants.ON_SELECT_PROVIDER, payload: data });
export const deselectProviderInfo = () => ({ type: administrationsConstants.ON_SELECT_PROVIDER });

const getProvidersInit = (params) => ({ type: administrationsConstants.ON_GET_ADMIN_PROVIDERS_INIT, payload: params });
const getProvidersSuccess = (data) => ({ type: administrationsConstants.ON_GET_ADMIN_PROVIDERS_SUCCESS, payload: data });
const getProvidersFailure = () => ({ type: administrationsConstants.ON_GET_ADMIN_PROVIDERS_FAILURE });

const saveProvidersInit = () => ({ type: administrationsConstants.ON_SAVE_ADMIN_PROVIDERS_INIT });
const saveProvidersSuccess = (data) => ({ type: administrationsConstants.ON_SAVE_ADMIN_PROVIDERS_SUCCESS, payload: data });
const saveProvidersFailure = () => ({ type: administrationsConstants.ON_SAVE_ADMIN_PROVIDERS_FAILURE });

export const resetProviders = () => ({ type: administrationsConstants.ON_RESET_ADMIN_PROVIDERS });
