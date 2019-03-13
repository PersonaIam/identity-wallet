/**
 * Created by vladtomsa on 2019-03-11
 */
import { http } from 'config/http';
import { sanctionsConstants, MAP_ATTRIBUTES_TO_SANCTIONS_PARAMS } from 'constants/sanctions';
import { onNotificationErrorInit } from './notifications';

export const getSanctions = (values) => async (dispatch) => {
  try {
    dispatch(getSanctionsInit());

    const params = {};

    values.forEach(({ type, value }) => {
      if (MAP_ATTRIBUTES_TO_SANCTIONS_PARAMS[type]) params[MAP_ATTRIBUTES_TO_SANCTIONS_PARAMS[type]] = value;
    });

    const { hits: { hits } } = await http.post(`/sanctions`, params);

    dispatch(getSanctionsSuccsess(hits));
  }
  catch (e) {
    dispatch(onNotificationErrorInit(e));
    dispatch(getSanctionsFailure());
  }
};

export const resetSanctions = () => ({ type: sanctionsConstants.RESET_SANCTIONS });

const getSanctionsInit = () => ({ type: sanctionsConstants.GET_SANCTIONS_INIT });
const getSanctionsSuccsess = (payload) => ({ type: sanctionsConstants.GET_SANCTIONS_SUCCESS, payload });
const getSanctionsFailure = () => ({ type: sanctionsConstants.GET_SANCTIONS_FAILURE });
