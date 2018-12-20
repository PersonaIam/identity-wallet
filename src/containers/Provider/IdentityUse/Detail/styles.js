/**
 * Created by vladtomsa on 17/12/2018
 */
import amber from '@material-ui/core/colors/amber';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { IDENTITY_USE_REQUEST_STATUSES } from 'constants/index';

const styles = (theme) => {
  return {
    [IDENTITY_USE_REQUEST_STATUSES.ACTIVE]: {
      color: lightGreen['A400'],
    },
    [IDENTITY_USE_REQUEST_STATUSES.INACTIVE]: {
      color: amber[500],
    },
    [IDENTITY_USE_REQUEST_STATUSES.PENDING_APPROVAL]: {
      color: theme.palette.text.secondary,
    },
    [IDENTITY_USE_REQUEST_STATUSES.ENDED]: {
      color: theme.palette.text.secondary,
    },
    inactive: {
      backgroundColor: amber[500],
      '& *': {
        color: '#FFFFFF',
      },
    },
  };
};

export default styles;
