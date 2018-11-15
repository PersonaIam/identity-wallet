import grey from "@material-ui/core/colors/grey";

const styles = (theme) => {
  return {
    filterContainer: {
      background: `linear-gradient(45deg, ${grey[700]}, ${grey[800]})`,
      borderRadius: '10px',
      paddingBottom: 10,
      // background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      '& h1': {
        color: 'rgba(250,250,250,0.92)',
        padding: '12px 24px 0 24px',
      },
    },
    filterFormPanel: {
      backgroundColor: 'rgba(0,0,0,0)',
      boxShadow: 'none',
      '& *': {
        color: '#ffffff !important',
      },
      '& p': {
        fontSize: 18,
        fontWeight: 300,
      }
    },
    divider: {
      backgroundColor: 'rgba(255,255,255,0.24)',
    },
  };
};

export default styles;
