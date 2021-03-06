/**
 * Created by vladtomsa on 08/10/2018
 */
const headerBoxPadding = 12;
const headerIconSize = 36;
const headerIconOffset = 10;

const styles = (theme) => {
  return {
    root: {
      position: 'relative',
    },
    cardIcom: {
      position: 'absolute',
      left: headerIconOffset,
      top: -headerIconOffset / 2,
      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      boxShadow: theme.shadows[8],
      borderRadius: 8,
      padding: headerBoxPadding,
      '& svg': {
        color: '#FFFFFF',
        width: headerIconSize,
        height: headerIconSize,
      }
    },
    cardHeaderContent: {
      marginLeft: headerIconOffset + 2 * headerBoxPadding + headerIconSize,
      minHeight: 2 * headerBoxPadding + headerIconSize,
      maxWidth: '100vw',
      [theme.breakpoints.up('sm')]: {
        paddingRight: headerIconOffset,
      },
    },
  };
};

export default styles;
