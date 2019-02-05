/**
 * Created by vladtomsa on 2019-02-05
 */
import { http } from 'config/http';
import { invitationsConstants } from 'constants/invitations';
import { onNotificationErrorInit } from './notifications';

export const getInvitations = (referralCode) => async (dispatch) => {
  try {
    dispatch(getInvitationsInit());

    const [ referralInfo ] = await http.get(`/referrals`, {
      params: {
        referralCode,
      }
    });

    dispatch(getInvitationsSuccsess(referralInfo.invitations));
  }
  catch (e) {
    dispatch(onNotificationErrorInit(e));
    dispatch(getInvitationsFailure());
  }
};

const getInvitationsInit = () => ({ type: invitationsConstants.GET_INVITATIONS_INIT });
const getInvitationsSuccsess = (payload) => ({ type: invitationsConstants.GET_INVITATIONS_SUCCESS, payload });
const getInvitationsFailure = () => ({ type: invitationsConstants.GET_INVITATIONS_FAILURE });
