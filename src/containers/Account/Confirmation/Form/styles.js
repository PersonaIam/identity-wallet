const styles = (theme) => {
  return {
    formContent: {
      padding: '32px 24px',
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
