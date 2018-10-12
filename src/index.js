/**
 * Created by vladtomsa on 26/09/2018
 */
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

// Redux dependencies
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import configureStore, {history} from 'config/redux';

// Material UI dependencies
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import {create} from 'jss';
import customTheme from 'config/theme';

// Translations dependencies
import 'config/translations';

// Global styles accessible from any component
import 'styles/global.css';

/**
 * Build configurations
 * */
const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
jss.options.insertionPoint = document.getElementById('jss-insertion-point');


// Create custom theme
const theme = createMuiTheme(customTheme);

// Create redux store
const store = configureStore();


const app = (
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>

        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ConnectedRouter history={history}>
            <App/>
          </ConnectedRouter>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </JssProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
