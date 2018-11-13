/**
 * Created by vladtomsa on 10/10/2018
 */
import { http } from 'config/http';
import { globalConstants } from 'constants/global';

export const storePassphrase = (value) => ({ type: globalConstants.ON_STORE_PASSPHRASE, payload: value });

export const removePassphrase = () => ({ type: globalConstants.ON_REMOVE_PASSPHRASE });

export const openSidenav = () => ({ type: globalConstants.OPEN_SIDENAV });

export const closeSidenav = () => ({ type: globalConstants.CLOSE_SIDENAV });

export const getCountries = () => async (dispatch) => {
  try {
    const countries = await http.get('/countries');

    dispatch({ type: globalConstants.ON_GET_COUNTRIES_SUCCESS, payload: countries });
  }
  catch (e) {
    dispatch({ type: globalConstants.ON_GET_COUNTRIES_ERROR, payload: e });
  }
};

