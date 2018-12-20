/**
 * Created by vladtomsa on 29/11/2018
 */
import amber from '@material-ui/core/colors/amber';
import teal from '@material-ui/core/colors/teal';
import { PROVIDER_SERVICE_STATUSES } from 'constants/index';

const styles = (theme) => {
  return {
    [PROVIDER_SERVICE_STATUSES.ACTIVE]: {
      color: teal['A400'],
    },
    [PROVIDER_SERVICE_STATUSES.INACTIVE]: {
      color: amber[500],
    },
    chip: {
      marginRight: 6,
      marginTop: 4.
    },
  };
};

export default styles;
