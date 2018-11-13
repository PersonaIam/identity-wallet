const styles = (theme) => {
  return {
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
