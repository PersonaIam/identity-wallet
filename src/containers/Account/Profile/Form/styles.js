const styles = (theme) => {
  return {
    form: {
      marginTop: 90,
    },
    modalWrapper: {
      '& >div': {
        position: 'relative',
      }
    },
    header: {
      position: 'absolute',
      top: -36,
      left: 24,
      right: 24,
      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      boxShadow: theme.shadows[1],
      minHeight: 70,
      '& .content': {
        padding: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      '& h4': {
        margin: 6,
        fontSize: 18,
        fontWeight: 300,
      },
      '& *': {
        color: '#ffffff',
      },
    },
    contactHeader: {
      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
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
