/**
 * Created by vladtomsa on 26/09/2018
 */
import blue from '@material-ui/core/colors/lightBlue';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';

const primary = blue;
const secondary = indigo;
const error = red;

const themeOverrides = {
  MuiButton: {
    root:{
      borderRadius: 30,
      letterSpacing: 1.1,
      textTransform: 'none',
    },
  },
};

const theme = {
  palette: {
    primary: {
      main: '#393C6D',
      dark: '#323561',
    },
    secondary: {
      main: '#09D0FF',
      dark: '#01A9EE',
    },
    error: { main: error[500] },
    background: { default: '#F7F7F7' },
  },
  overrides: themeOverrides,
};

export default theme;
