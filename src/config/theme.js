/**
 * Created by vladtomsa on 26/09/2018
 */
import red from '@material-ui/core/colors/red';

const error = red;

const themeOverrides = {
  MuiAppBar: {
    colorPrimary: {
      background: `linear-gradient(45deg, #01579B, #323561)`,
    },
  },
  MuiButton: {
    root:{
      borderRadius: 30,
      letterSpacing: 1.1,
      textTransform: 'none',
      "&$disabled": {
        background: 'rgba(0, 0, 0, 0.12) !important',
      }
    },
    containedPrimary: {
      color: '#FFFFFF',
      background: `linear-gradient(45deg, #01579B, #323561)`,
      '&:hover': {
        background: `linear-gradient(45deg, #01A9EE, #01579B)`,
      },
      "&$disabled": {
        background: 'rgba(0, 0, 0, 0.12) !important',
      },
    },
    containedSecondary: {
      color: '#FFFFFF',
      "&$disabled": {
        background: 'rgba(0, 0, 0, 0.12) !important',
      },
    },
  },
  MuiChip: {
    root: {
      marginRight: 6,
      marginTop: 4,
    },
  },
  MuiDialog: {
    paper: {
      backgroundColor: '#FFFFFF',
      borderRadius: '4px',
      boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
      minWidth: '40vh',
      maxWidth: '96%',
    },
  },
  MuiDialogTitle: {
    root: {
      '& *': {
        fontWeight: 300,
      },
    },
  },
  MuiFab: {
    primary: {
      '& svg': {
        color: '#FFFFFF',
      },
    },
    secondary: {
      '& svg': {
        color: '#FFFFFF',
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
  MuiStepper: {
    root: {
      '@media (max-width:599.95px)': {
        padding: 6,
      },
    }
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
  typography: {
    useNextVariants: true,
  },
  overrides: themeOverrides,
};

export default theme;
