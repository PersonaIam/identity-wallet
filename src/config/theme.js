/**
 * Created by vladtomsa on 26/09/2018
 */
import red from '@material-ui/core/colors/red';

const error = red;

const themeOverrides = {
  MuiButton: {
    root:{
      borderRadius: 30,
      letterSpacing: 1.1,
      textTransform: 'none',
    },
    raisedPrimary: {
      color: '#FFFFFF',
      background: `linear-gradient(45deg, #01579B, #323561)`,
      '&:hover': {
        background: `linear-gradient(45deg, #01A9EE, #01579B)`,
      }
    },
    raisedSecondary: {
      color: '#FFFFFF',
    },
  },
  MuiDialog: {
    paper: {
      minWidth: 460,
      maxWidth: '94%',
    },
  },
  MuiDialogTitle: {
    root: {
      '& *': {
        fontWeight: 300,
      },
    },
  },
  MuiInputAdornment: {
    root: {
      '& svg': {
        color: 'rgba(0, 0, 0, 0.54)'
      },
    },
  },
  MuiSnackbarContent: {
    message: {
      flex: 1,
    },
  },
  MuiTab: {
    root:{
      textTransform: 'none',
    },
  },
  MuiTooltip: {
    tooltip: {
      textAlign: 'justify',
      fontSize: 14,
    },
  },
  MuiTypography: {
    caption: {
      fontSize: '0.9rem',
    },
  },
};

const theme = {
  palette: {
    primary: {
      main: '#01579B',
      dark: '#323561',
    },
    secondary: {
      light: '#B3E5FC',
      main: '#0cabff',
      dark: '#1085ee',
    },
    error: { main: error[500] },
    background: { default: '#F7F7F7' },
  },
  overrides: themeOverrides,
};

export default theme;
