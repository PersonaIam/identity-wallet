/**
 * Created by vladtomsa on 26/11/2018
 */
import { subscriptionConstants } from 'constants/subscriptions';

const initialState = {
  subscriptionInfoList: [],
  count: null,
  pageNumber: 0,
  pageSize: 25,
  isLoading: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case (subscriptionConstants.ON_CREATE_SUBSCRIPTIONS_INIT):
      return { ...state, isLoading: subscriptionConstants.ON_CREATE_SUBSCRIPTIONS_INIT };
    case (subscriptionConstants.ON_CREATE_SUBSCRIPTIONS_SUCCESS):
    case (subscriptionConstants.ON_CREATE_SUBSCRIPTIONS_FAILURE):
      return { ...state, isLoading: null };
    default:
      return state;
  }
}
