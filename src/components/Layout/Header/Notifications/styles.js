/**
 * Created by vladtomsa on 25/10/2018
 */
/**
 * Created by vladtomsa on 26/09/2018
 */


const styles = theme => {
  return {
    root: {
      [theme.breakpoints.down('xs')]: {
        color: '#FFFFFF !important',
      },
    },
    badge: {
      color: '#FFF !important',
      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      boxShadow: theme.shadows[6],
    }
  }
};

export default styles;
