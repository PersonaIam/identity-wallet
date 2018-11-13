/**
 * Created by vladtomsa on 08/11/2018
 */
import { http } from 'config/http';
import { notariesConstants } from 'constants/notaries';
import { onNotificationErrorInit } from './notifications';

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

const getNotariesInit = (params) => ({ type: notariesConstants.ON_GET_NOTARIES_INIT, payload: params });
const getNotariesSuccess = (data) => ({ type: notariesConstants.ON_GET_NOTARIES_SUCCESS, payload: data });
const getNotariesFailure = () => ({ type: notariesConstants.ON_GET_NOTARIES_FAILURE });
export const resetNotaries = () => ({ type: notariesConstants.ON_RESET_NOTARIES });
