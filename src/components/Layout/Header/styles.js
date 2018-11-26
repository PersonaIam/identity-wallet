/**
 * Created by vladtomsa on 26/09/2018
 */
export const toolbarHeight = {
  xs: 56,
  sm: 64,
  md: 80,
};

export const logoWidth = 190;

export const toolbarRadius = 10;

export const toolbarMarginTop = 16;

const styles = theme => {
  return {
    appBar: {
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      color: theme.palette.text.secondary,
      [theme.breakpoints.up('sm')]: {
        background: '#FFFFFF',
      },
      [theme.breakpoints.up('md')]: {
        minHeight: toolbarHeight.md,
        borderRadius: toolbarRadius,
        marginTop: toolbarMarginTop,
      },
    },
    toolbar: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 0,
      },
      [theme.breakpoints.up('md')]: {
        minHeight: toolbarHeight.md,
      },
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('xs')]: {
        minHeight: toolbarHeight.xs,
      },
      [theme.breakpoints.up('sm')]: {
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        minHeight: toolbarHeight.sm,
        padding: '4px 16px',
      },
      [theme.breakpoints.up('md')]: {
        minHeight: toolbarHeight.md,
        padding: '16px 24px',
        borderRadius: `${toolbarRadius}px 0 0 ${toolbarRadius}px`,
        width: logoWidth,
      },
      '& img': {
        width: '100%',
        maxWidth: 200,
        height: 'auto',
      },
      '& svg': {
        color: '#FFFFFF',
      },
      '& button': {
        marginRight: theme.spacing.unit,
      }
    },
    userMenuToggle: {
      '& *': {
        color: `${theme.palette.text.secondary} !important`,
        [theme.breakpoints.down('xs')]: {
          color: '#FFFFFF !important',
        },
      },
    },
    badge: {
      color: '#FFF !important',
      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      boxShadow: theme.shadows[6],
    }
  }
};

export default styles;
