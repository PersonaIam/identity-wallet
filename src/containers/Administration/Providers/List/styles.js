/**
 * Created by vladtomsa on 23/11/2018
 */
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';

const styles = {
  root: {
    padding: 8,
  },
  item: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  active: {
    color: green[500],
    marginRight: 12,
  },
  inactive: {
    color: amber[500],
    marginRight: 12,
  },
};

export default styles;
