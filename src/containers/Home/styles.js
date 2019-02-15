/**
 * Created by vladtomsa on 26/11/2018
 */
const styles = (theme) => {
  return {
    root: {
      '& img': {
        width: '100%',
        padding: 16,
      },
      '& h1': {
        padding: 20,
      },
    },
    section1: {
      [theme.breakpoints.up('md')]: {
        padding: '16px 90px',
      },
    },
    form: {
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      paddingBottom: 30,
      marginBottom: 40,
      '& *': {
        color: '#FFF !important',
      },
      '& button': {
        borderColor: '#FFF',
        padding: '8px 24px',
        '&:disabled': {
          opacity: '0.4'
        },
      },
    },
  };
};

export default styles;
