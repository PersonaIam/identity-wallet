/**
 * Created by vladtomsa on 12/10/2018
 */
import { logoWidth, toolbarRadius } from '../Header/styles';

const styles = (theme) => ({
  root: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    [theme.breakpoints.up('md')]: {
      borderRadius: toolbarRadius,
      boxShadow: theme.shadows[11],
      marginTop: theme.spacing.unit * 2,
      padding: `${toolbarRadius}px 0`,
      position: 'relative',
      width: logoWidth,
    },
  },
  listItem: {
    '& *': {
      color: 'rgba(255,255,255, 0.9)'
    },
  },
  sidenavListItem: {
    paddingLeft: 0,
  },
  listSubheader: {
    lineHeight: '32px',
    color: 'rgba(255,255,255, 0.9)',
  },
  listDivider: {
    backgroundColor: 'rgba(255,255,255, 0.18)',
  },
  active: {
    '& *': {
      color: `${theme.palette.secondary.main}`,
    },
  },
});

export default styles;
