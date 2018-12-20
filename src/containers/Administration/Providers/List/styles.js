/**
 * Created by vladtomsa on 23/11/2018
 */
import amber from '@material-ui/core/colors/amber';
import teal from '@material-ui/core/colors/teal';

const styles = {
  root: {
    padding: 8,
  },
  item: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  active: {
    color: teal['A400'],
    marginRight: 12,
  },
  inactive: {
    color: amber[500],
    marginRight: 12,
  },
};

export default styles;
