/**
 * Created by vladtomsa on 10/10/2018
 */
import { invitationsConstants } from 'constants/invitations';

const initialState = {
  isLoading: null,
  userInvitations: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case (invitationsConstants.GET_INVITATIONS_INIT): return { ...state, isLoading: true };
    case (invitationsConstants.GET_INVITATIONS_SUCCESS): return { ...state, userInvitations: payload, isLoading: null };
    case (invitationsConstants.GET_INVITATIONS_FAILURE): return { ...state, isLoading: null };
    default:
      return state;
  }
};
