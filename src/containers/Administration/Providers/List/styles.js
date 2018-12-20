/**
 * Created by vladtomsa on 23/11/2018
 */
import amber from '@material-ui/core/colors/amber';
import lightGreen from '@material-ui/core/colors/lightGreen';

const styles = {
  root: {
    padding: 8,
  },
  item: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  active: {
    color: lightGreen['A400'],
    marginRight: 12,
  },
  inactive: {
    color: amber[500],
    marginRight: 12,
  },
};

export default styles;
