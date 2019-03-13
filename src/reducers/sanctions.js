/**
 * Created by vladtomsa on 2019-03-11
 */
import { sanctionsConstants } from 'constants/sanctions';

const initialState = {
  isLoading: null,
  sanctionEntitites: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case (sanctionsConstants.GET_SANCTIONS_INIT): return { ...state, isLoading: true };
    case (sanctionsConstants.GET_SANCTIONS_SUCCESS): return { ...state, sanctionEntitites: payload, isLoading: null };
    case (sanctionsConstants.GET_SANCTIONS_FAILURE): return { ...state, isLoading: null };
    case (sanctionsConstants.RESET_SANCTIONS): return initialState;
    default:
      return state;
  }
};
