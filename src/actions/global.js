/**
 * Created by vladtomsa on 10/10/2018
 */
import { globalConstants } from 'constants/global';

export const storePassphrase = (value) => ({ type: globalConstants.ON_STORE_PASSPHRASE, payload: value });

export const removePassphrase = () => ({ type: globalConstants.ON_REMOVE_PASSPHRASE });

export const openSidenav = () => ({ type: globalConstants.OPEN_SIDENAV });

export const closeSidenav = () => ({ type: globalConstants.CLOSE_SIDENAV });

