/**
 * Created by vladtomsa on 08/11/2018
 */
import {authConstants} from 'constants/auth';
import {notariesConstants} from 'constants/notaries';

const initialState = {
  notaryInfoList: [],
  favoriteNotaries: {},
  notariesCount: null,
  pageNumber: 0,
  pageSize: 25,
  isLoading: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case (notariesConstants.ON_GET_NOTARIES_INIT):
      return {
        ...state,
        isLoading: notariesConstants.ON_GET_NOTARIES_INIT,
        pageNumber: payload.pageNumber,
        pageSize: payload.pageSize
      };

    case (notariesConstants.ON_GET_NOTARIES_SUCCESS):
      return {...state, isLoading: null, notaryInfoList: payload.userInfoList, notariesCount: payload.count};

    case (notariesConstants.ON_GET_NOTARIES_FAILURE):
      return {...state, isLoading: null};

    case (notariesConstants.ON_GET_FAVORITE_NOTARIES_INIT):
      return { ...state, isLoading: notariesConstants.ON_GET_FAVORITE_NOTARIES_INIT };

    case (notariesConstants.ON_GET_FAVORITE_NOTARIES_SUCCESS):
      const favoriteNotaries = {};
      payload.forEach((favInfo) => {
        favoriteNotaries[favInfo.notaryId] = favInfo;
      });
      return {...state, isLoading: null, favoriteNotaries };

    case (notariesConstants.ON_GET_FAVORITE_NOTARIES_FAILURE):
      return {...state, isLoading: null};

    case (notariesConstants.ON_SAVE_FAV_NOTARY_INIT):
      return { ...state, isLoading: notariesConstants.ON_SAVE_FAV_NOTARY_INIT + payload.notaryId };

    case (notariesConstants.ON_REMOVE_FAV_NOTARY_INIT):
      return { ...state, isLoading: notariesConstants.ON_REMOVE_FAV_NOTARY_INIT + payload.notaryId };

    case (notariesConstants.ON_SAVE_FAV_NOTARY_DONE):
    case (notariesConstants.ON_REMOVE_FAV_NOTARY_DONE):
      return { ...state, isLoading: null };

    case (notariesConstants.ON_RESET_NOTARIES):
      return { ...initialState, favoriteNotaries: state.favoriteNotaries };

    case (authConstants.ON_LOGOUT):
      return { ...state, favoriteNotaries: initialState.favoriteNotaries };

    default:
      return state;
  }
}
