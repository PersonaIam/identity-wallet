/**
 * Created by vladtomsa on 12/10/2018
 */
const styles = (theme) => {
  return {
    circle: {
      color: '#FFFFFF',
      background: `rgba(255,255,255,0.6)`,
      borderRadius: '50%',
      '& :before': {
        borderRadius: '50%',
      },
    },
    percentage: {
      position: 'relative',
      '& .value': {
        position: 'absolute',
        top: 6,
        left: 6,
        width: 108,
        height: 108,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
        borderRadius: '50%',
        color: 'rgba(255, 255, 255, 0.79)',
        fontSize: 28,
        fontWeight: 500,
      },
    },
  };
};

export default styles;
