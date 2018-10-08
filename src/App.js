import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { isLoggedIn, logout } from 'actions/auth';
import * as notificationActions from 'actions/notifications';
import Layout from 'components/Layout';
import Notification from 'components/Notification';
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
    const { notification, onLogout, onNotificationClose, userInfo } = this.props;

    const routes = getApplicationRoutes(userInfo);

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
        {
          !!(notification)
            ? (
              <Notification
                notification={notification}
                onNotificationClose={onNotificationClose}
              />
            )
            : null
        }

        <Layout userInfo={userInfo} onLogout={onLogout}>
          { router }
        </Layout>
      </Fragment>
    );
  }

  componentDidMount() {
    this.props.checkIsLoggedIn();
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification.notification,
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  checkIsLoggedIn: () => dispatch(isLoggedIn()),
  onNotificationClose: () => dispatch(notificationActions.onNotificationClose()),
  onLogout: () => dispatch(logout()),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps)(App);

const withStyle = withStyles(styles)(withRedux);

export default withRouter(withStyle);
