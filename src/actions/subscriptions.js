/**
 * Created by vladtomsa on 26/11/2018
 */
import { http } from 'config/http';
import { subscriptionConstants } from 'constants/subscriptions';
import { onNotificationErrorInit, onNotificationSuccessInit } from './notifications';

export const createSubscription = (data) =>  async (dispatch) => {
  try {
    dispatch(createSubscriptionsInit());

    await http.post(`/subscription`, data );

    dispatch(createSubscriptionsSuccess());
    dispatch(onNotificationSuccessInit('SUBSCRIPTION_SUCCESS'));

    return true;
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(createSubscriptionsFailure());

    return false;
  }
};

const createSubscriptionsInit = () => ({ type: subscriptionConstants.ON_CREATE_SUBSCRIPTIONS_INIT });
const createSubscriptionsSuccess = () => ({ type: subscriptionConstants.ON_CREATE_SUBSCRIPTIONS_SUCCESS });
const createSubscriptionsFailure = () => ({ type: subscriptionConstants.ON_CREATE_SUBSCRIPTIONS_FAILURE });
