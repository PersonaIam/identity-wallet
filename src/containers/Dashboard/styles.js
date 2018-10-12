/**
 * Created by vladtomsa on 12/10/2018
 */
const styles = (theme) => {
  return {
    dashboardCard: {

    },
    basicAttributeCompletion: {
      marginTop: 32,
      minHeight: 146,
      position: 'relative',
      '& >div': {
        background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
        borderRadius: 8,
        boxShadow: theme.shadows[6],
        padding: 16,
        position: 'absolute',
        top: -16,
        left: 16,
        width: 'calc(100% - 32px)',
      }
    },
    content: {
      padding: 16,
      '& h3': {
        fontSize: '1.125rem',
        fontWeight: 300,
        marginBottom: 6,
      },
      '& p': {
        color: '#999',
        fontSize: 14,
        fontWeight: 300,
      },
    },
    divider: {
      marginTop: 10,
      marginBottom: 10,
    }
  };
};

export default styles;
