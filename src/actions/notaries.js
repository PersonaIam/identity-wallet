/**
 * Created by vladtomsa on 08/11/2018
 */
import { http } from 'config/http';
import { notariesConstants } from 'constants/notaries';
import { onNotificationErrorInit, onNotificationSuccessInit } from './notifications';

export const getNotariesByLocation = (params) =>  async (dispatch) => {
  try {
    dispatch(getNotariesInit(params));

    const response = await http.get(`/notaries/by-location`, { params });

    dispatch(getNotariesSuccess(response));

    return true;
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(getNotariesFailure());

    return false;
  }
};

export const getFavoriteNotaries = () =>  async (dispatch) => {
  try {
    dispatch(getFavoriteNotariesInit());

    const response = await http.get(`/favorites`);

    dispatch(getFavoriteNotariesSuccess(response));
  }
  catch (error) {
    dispatch(getFavoriteNotariesFailure());
  }
};

export const saveFavNotary = (notaryId) => async (dispatch) => {
  try {
    dispatch(saveNotaryInit(notaryId));

    await http.post(`/favorites`, { notaryId });

    dispatch(getFavoriteNotaries());

    dispatch(onNotificationSuccessInit('NOTARY_SAVED_AD_FAV_SUCCESSFULLY'));
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
  }
  finally {
    dispatch(saveNotaryDone());
  }
};

export const removeFavNotary = (id, notaryId) => async (dispatch) => {
  try {
    dispatch(removeNotaryInit(notaryId));

    await http.delete(`/favorites/${id}`);

    dispatch(getFavoriteNotaries());

    dispatch(onNotificationSuccessInit('NOTARY_REMOVED_FROM_FAV_SUCCESSFULLY'));
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
  }
  finally {
    dispatch(removeNotaryDone());
  }
};


const getNotariesInit = (params) => ({ type: notariesConstants.ON_GET_NOTARIES_INIT, payload: params });
const getNotariesSuccess = (data) => ({ type: notariesConstants.ON_GET_NOTARIES_SUCCESS, payload: data });
const getNotariesFailure = () => ({ type: notariesConstants.ON_GET_NOTARIES_FAILURE });

const getFavoriteNotariesInit = () => ({ type: notariesConstants.ON_GET_FAVORITE_NOTARIES_INIT });
const getFavoriteNotariesSuccess = (data) => ({ type: notariesConstants.ON_GET_FAVORITE_NOTARIES_SUCCESS, payload: data });
const getFavoriteNotariesFailure = () => ({ type: notariesConstants.ON_GET_FAVORITE_NOTARIES_FAILURE });

const saveNotaryInit = (notaryId) => ({ type: notariesConstants.ON_SAVE_FAV_NOTARY_INIT, payload: { notaryId } });
const saveNotaryDone = () => ({ type: notariesConstants.ON_SAVE_FAV_NOTARY_DONE });

const removeNotaryInit = (notaryId) => ({ type: notariesConstants.ON_REMOVE_FAV_NOTARY_INIT, payload: { notaryId } });
const removeNotaryDone = () => ({ type: notariesConstants.ON_REMOVE_FAV_NOTARY_DONE });


export const resetNotaries = () => ({ type: notariesConstants.ON_RESET_NOTARIES });
