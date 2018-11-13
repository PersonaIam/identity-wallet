/**
 * Created by vladtomsa on 10/10/2018
 */
const styles = (theme) => {
  return {
    root: {
      marginTop: 32,
    },
    cardHeaderContent: {
      paddingTop: 10,
      paddingLeft: 8,
    },
    createdAttribute: {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        color: theme.palette.secondary.main,
        marginRight: 6,
      },
    },
  };
};

export default styles;
