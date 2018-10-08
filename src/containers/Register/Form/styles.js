const styles = (theme) => {
  return {
    modalWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      '& >div': {
        position: 'relative',
        minWidth: '90%',
        [theme.breakpoints.up('sm')]: {
          minWidth: 370,
        },
      }
    },
    header: {
      position: 'absolute',
      top: -36,
      left: 24,
      right: 24,
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      boxShadow: theme.shadows[1],
      minHeight: 70,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .content': {
        padding: 16,
      },
      '& h4': {
        margin: 6,
        fontSize: 18,
        fontWeight: 600,
      },
      '& *': {
        color: '#ffffff',
      },
    },
    formContent: {
      padding: '90px 24px 32px',
      '& p': {
        color: theme.palette.text.secondary,
        margin: 10,
      },
      '& svg': {
        color: theme.palette.text.secondary,
      },
    },
    tooltipContainer: {
      padding: 8,
      '& *': {
        color: '#ffffff !important',
      },
    },
    submitButton: {
      color: '#FFFFFF',
      fontWeight: 600,
    },
  };
};

export default styles;
