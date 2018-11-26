/**
 * Created by vladtomsa on 23/11/2018
 */
import red from '@material-ui/core/colors/red';
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
    marginRight: 6,
  },
  inactive: {
    color: red[500],
    marginRight: 6,
  },
};

export default styles;
