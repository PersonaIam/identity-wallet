/**
 * Created by vladtomsa on 06/11/2018
 */
const styles = (theme) => {
  return {
    alertTitle: {
      '& *': {
        color: theme.palette.text.secondary,
      },
      '& h2': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    alertContainer: {
      '& ul': {
        paddingLeft: 20,
      },
    },
  };
};

export default styles;
