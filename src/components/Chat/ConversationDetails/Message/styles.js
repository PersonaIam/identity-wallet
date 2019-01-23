/**
 * Created by vladtomsa on 22/01/2019
 */
export default (theme) => {
  return {
    message: {
      margin: '6px 0',
      maxWidth: '90%',
      position: 'relative',
      background: `linear-gradient(45deg, #f7f7f7, #ffffff)`,
      '&:after': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '33%',
        width: 0,
        height: 0,
        border: '12px solid transparent',
        borderRightColor: '#e9e9e9',
        borderLeft: 0,
        borderTop: 0,
        marginTop: -11,
        marginLeft: -12,
      }
    },
    ownMessage: {
      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      '&:after': {
        left: 'calc(100% + 12px)',
        borderLeftColor: theme.palette.secondary.dark,
        borderLeftWidth: 12,
        borderLeftStyle: 'solid',
        borderRight: 0,
        borderTop: 0,
        marginTop: -11,
        marginRight: -12,
      },
      '& p': {
        color: '#FFF',
      },
      '& span': {
        color: 'rgba(255,255,255,0.54)'
      },
    },
  }
}
