const styles = theme => ({
  searchCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    boxShadow: theme.shadows[6],
    display: 'flex',
    margin: '0 12px',
    marginRight: -40,
    padding: 2,
    height: 40,
    '& >div': {
      padding: '0 6px 0 24px',
    },
    '& input': {
      height: 34,
      marginRight: 50,
      padding: '2px 10px',
    },
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 10,
    left: 0,
    right: 0,
    overflow: 'scroll',
  },
  submitButton: {
    borderRadius: 0,
  }
});

export default styles;
