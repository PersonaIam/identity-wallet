/**
 * Created by vladtomsa on 29/11/2018
 */
import amber from '@material-ui/core/colors/amber';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { PROVIDER_SERVICE_STATUSES } from 'constants/index';

const styles = (theme) => {
  return {
    listItemText: {
      paddingRight: 80,
    },
    chip: {
      marginRight: 6,
      marginTop: 4.
    },
    [PROVIDER_SERVICE_STATUSES.ACTIVE]: {
      color: lightGreen['A400'],
    },
    [PROVIDER_SERVICE_STATUSES.INACTIVE]: {
      color: amber[500],
    },
    actionButton: {
      marginRight: 12,
    }
  };
};

export default styles;
