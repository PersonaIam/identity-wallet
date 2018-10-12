/**
 * Created by vladtomsa on 09/10/2018
 */
import { blockchainAccountConstants } from 'constants/blockchainAccount';

const initialState = {
  isLoading: null,
  userBlockchainAccount: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case (blockchainAccountConstants.ON_GET_BLOCKCHAIN_ACCOUNT_INIT):
      return { ...state, isLoading: blockchainAccountConstants.ON_GET_BLOCKCHAIN_ACCOUNT_INIT };
    case (blockchainAccountConstants.ON_GET_BLOCKCHAIN_ACCOUNT_SUCCESS):
      return { ...state, isLoading: null, userBlockchainAccount: payload };
    case (blockchainAccountConstants.ON_GET_BLOCKCHAIN_ACCOUNT_FAILURE):
      return { ...state, isLoading: null };
    default:
      return state;
  }
}
