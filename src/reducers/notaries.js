/**
 * Created by vladtomsa on 08/11/2018
 */
import { notariesConstants } from 'constants/notaries';

const initialState = {
  notaryInfoList: [],
  notariesCount: null,
  pageNumber: 0,
  pageSize: 25,
  isLoading: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case (notariesConstants.ON_GET_NOTARIES_INIT):
      return { ...state, isLoading: notariesConstants.ON_GET_NOTARIES_INIT, pageNumber: payload.pageNumber, pageSize: payload.pageSize };
    case (notariesConstants.ON_GET_NOTARIES_SUCCESS):
      return { ...state, isLoading: null, notaryInfoList: payload.userInfoList, notariesCount: payload.count };
    case (notariesConstants.ON_GET_NOTARIES_FAILURE):
      return { ...state, isLoading: null };
    case (notariesConstants.ON_RESET_NOTARIES):
      return { ...state, ...initialState };
    default:
      return state;
  }
}
