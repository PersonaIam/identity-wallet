/**
 * Created by vladtomsa on 10/10/2018
 */
import { globalConstants } from 'constants/global';

const initialState = {
  // passphrase: null,
  passphrase: 'blade early broken display angry wine diary alley panda left spy woman',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case (globalConstants.ON_STORE_PASSPHRASE):
      return { ...state, passphrase: payload };
    case (globalConstants.ON_REMOVE_PASSPHRASE):
      return { ...state, passphrase: null };
    default:
      return state;
  }
};
