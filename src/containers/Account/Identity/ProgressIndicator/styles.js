/**
 * Created by vladtomsa on 08/10/2018
 */
const styles = (theme) => {
  return {
    circle: {
      background: `${theme.palette.text.disabled}`,
      borderRadius: '50%',
      '& :before': {
        borderRadius: '50%',
      },
    },
    percentage: {
      position: 'relative',
      '& .value': {
        position: 'absolute',
        top: 4,
        left: 4,
        width: 82,
        height: 82,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FFFFFF',
        borderRadius: '50%',
        color: theme.palette.text.secondary,
        fontSize: 18,
        fontWeight: 500,
      },
    },
  };
};

export default styles;
