/**
 * Created by vladtomsa on 03/12/2018
 */
const styles = (theme) => {
  return {
    gridItem: {
      // [theme.breakpoints.up('md')]: {
      //   maxWidth: '25%',
      // },
    },
    expansionPanel: {
      // backgroundColor: 'rgba(0,0,0,0)',
      border: `1px solid rgba(0,0,0,0.1)`,
      borderRadius: 12,
      boxShadow: 'none !important',
      marginBottom: 6,
      '&:before': {
        backgroundColor: 'rgba(0,0,0,0)',
      },
    },
  };
};

export default styles;
