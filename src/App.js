import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { isLoggedIn, logout } from 'actions/auth';
import { openSidenav, closeSidenav, getCountries } from 'actions/global';
import { getBlockchainAccount } from 'actions/blockchainAccount';
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

  reloadAccount = () => {
    const { userInfo, reloadAccount } = this.props;

    if (userInfo && userInfo.personaAddress) {
      reloadAccount(userInfo.personaAddress);
    }
  };

  render() {
    const { notification, onLogout, onNotificationClose, openSidenav, closeSidenav, sidenavOpened, userInfo } = this.props;

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

        <Layout
          userInfo={userInfo}
          onLogout={onLogout}
          sidenavOpened={sidenavOpened}
          openSidenav={openSidenav}
          closeSidenav={closeSidenav}
          reloadAccount={this.reloadAccount}
        >
          { router }
        </Layout>
      </Fragment>
    );
  }

  componentDidMount() {
    this.props.checkIsLoggedIn();
    this.props.getCountries();
  }
}

const mapStateToProps = (state) => {
  const { auth, attributes, blockchainAccount: { userBlockchainAccount } } = state;
  const userAttributes = attributes && attributes.userAttributes ? attributes.userAttributes : [];
  let userInfo = auth.userInfo;

  if (userInfo){
    userInfo = { ...userInfo, userBlockchainAccount, userAttributes };
  }

  return {
    notification: state.notification.notification,
    sidenavOpened: state.global.sidenavOpened,
    userInfo: userInfo,
  }
};

const mapDispatchToProps = (dispatch) => ({
  checkIsLoggedIn: () => dispatch(isLoggedIn()),
  onNotificationClose: () => dispatch(notificationActions.onNotificationClose()),
  onLogout: () => dispatch(logout()),
  openSidenav: () => dispatch(openSidenav()),
  closeSidenav: () => dispatch(closeSidenav()),
  reloadAccount: (address) => dispatch(getBlockchainAccount(address)),
  getCountries: () => dispatch(getCountries()),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps)(App);

const withStyle = withStyles(styles)(withRedux);

export default withRouter(withStyle);
