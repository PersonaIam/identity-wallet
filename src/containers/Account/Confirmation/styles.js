const styles = (theme) => {
  return {
    content: {
      paddingTop: 100,
      paddingBottom: 100,
    },
    header: {
      position: 'relative',
      '& >div': {
        position: 'absolute',
        top: -36,
        width: '90%',
        margin: '0 5%',
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        boxShadow: theme.shadows[1],
        borderRadius: 4,
        minHeight: 70,
        textAlign: 'center',
        '& h4': {
          margin: 6,
          fontSize: 18,
          fontWeight: 600,
          color: '#ffffff',
        },
      },
    },
    stepperContainer: {
      paddingTop: 52,
      [theme.breakpoints.up('sm')]: {
        padding: '52px 5% 32px',
      },
    }
  };
};

export default styles;
