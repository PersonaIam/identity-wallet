import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Layout from 'components/Layout';
import ConnectedSwitch from 'components/ConnectedSwitch';
import { getApplicationRoutes } from 'config/routes';

const styles = {
  '@global body': {
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
};

class App extends Component {
  render() {
    const routes = getApplicationRoutes();

    const router = (
      <ConnectedSwitch>
        {
          routes.map((route, index) => (
            <Route key={index} exact={route.exact} path={route.path} name={route.name} component={route.component}/>
          ))
        }

        <Route render={() => (<div>Not existing</div>)} />
      </ConnectedSwitch>
    );

    return (
      <Fragment>
        <Layout>
          { router }
        </Layout>
      </Fragment>
    );
  }
}

const withStyle = withStyles(styles)(App);

export default withRouter(withStyle);
