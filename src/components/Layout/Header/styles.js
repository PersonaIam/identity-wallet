/**
 * Created by vladtomsa on 26/09/2018
 */
export const toolbarHeight = {
  xs: 56,
  sm: 64,
  md: 80,
};

const toolbarRadius = 10;

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
        marginTop: 36,
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
      },
      '& img': {
        width: '100%',
        maxWidth: 200,
        height: 'auto',
      },
    },
    userMenuToggle: {
      '& *': {
        color: `${theme.palette.text.secondary} !important`,
      },
    },
  }
};

export default styles;
