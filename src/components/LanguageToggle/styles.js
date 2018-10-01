const styles = (theme) => {
  return {
    avatar: {
      width: 20,
      height: 20,
      boxShadow: theme.shadows[5],
    },
    languageMenu: {
      '& ul': {
        padding: 0,
      },
    },
  };
};

export default styles;
