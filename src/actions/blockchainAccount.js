/**
 * Created by vladtomsa on 09/10/2018
 */
import { blockchain } from 'config/http';
import { blockchainAccountConstants } from 'constants/blockchainAccount';
import { onNotificationErrorInit } from './notifications';

export const getBlockchainAccount = (address) =>  async (dispatch) => {
  try {
    dispatch(getBlockchainAccountInit());

    const { account } = await blockchain.get(`/accounts?address=${address}`);

    dispatch(getBlockchainAccountSuccess(account));
  }
  catch (error) {
    dispatch(onNotificationErrorInit(error));
    dispatch(getBlockchainAccountFailure());
  }
};

const getBlockchainAccountInit = () => ({ type: blockchainAccountConstants.ON_GET_BLOCKCHAIN_ACCOUNT_INIT });
const getBlockchainAccountSuccess = (data) => ({ type: blockchainAccountConstants.ON_GET_BLOCKCHAIN_ACCOUNT_SUCCESS, payload: data });
const getBlockchainAccountFailure = () => ({ type: blockchainAccountConstants.ON_GET_BLOCKCHAIN_ACCOUNT_FAILURE });
