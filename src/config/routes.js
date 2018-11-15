import Loadable from 'react-loadable';
import Loading from 'components/Loading';
import AccountDetailsIcon from 'mdi-material-ui/AccountCardDetails';
import AccountGroup from 'mdi-material-ui/AccountGroup';
import Animation from 'mdi-material-ui/Animation';
import AccountCheck from 'mdi-material-ui/AccountCheck';
import DashboardIcon from 'mdi-material-ui/ViewDashboard';
import { USER_ROLES } from 'constants/index';
import groupBy from 'lodash/groupBy';

const AccountCreate = Loadable({
  loader: () => import('containers/Account/Confirmation'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('containers/Dashboard'),
  loading: Loading,
});

const Home = Loadable({
  loader: () => import('containers/Home'),
  loading: Loading,
});

const Identity = Loadable({
  loader: () => import('containers/Account/Identity'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('containers/Login'),
  loading: Loading,
});

const Notaries = Loadable({
  loader: () => import('containers/Notaries'),
  loading: Loading,
});

const NotaryValidationRequests = Loadable({
  loader: () => import('containers/NotarizationRequests/NotaryValidationRequests'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('containers/Account/Profile'),
  loading: Loading,
});

const Register = Loadable({
  loader: () => import('containers/Register'),
  loading: Loading,
});

const UserSentValidationRequests = Loadable({
  loader: () => import('containers/NotarizationRequests/UserSentValidationRequests'),
  loading: Loading,
});


const isLoggedIn = (userInfo) => !!(userInfo);

const isNotary = (userInfo) => isLoggedIn(userInfo) && userInfo.userRoleId === USER_ROLES.NOTARY;

const isRouteAvailable = (route, userInfo) => (route.isAvailable === undefined || route.isAvailable(userInfo));

export const MENU_GROUPS = {
  IDENTITY: 'Identity',
  NOTARY: 'Notary',
};

const routes =  [
  {
    path: '/login',
    exact: true,
    component: Login,
    isAvailable: () => true,
  },
  {
    path: '/register',
    exact: true,
    component: Register,
    isAvailable: () => true,
  },
  {
    path: '/account/confirmation/:token',
    exact: true,
    component: AccountCreate,
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    isAvailable: isLoggedIn,
    showInMenu: true,
    icon: DashboardIcon,
  },
  {
    path: '/identity',
    exact: true,
    component: Identity,
    isAvailable: isLoggedIn,
    showInMenu: true,
    icon: AccountDetailsIcon,
    parent: MENU_GROUPS.IDENTITY,
  },
  {
    path: '/notaries',
    exact: true,
    component: Notaries,
    isAvailable: isLoggedIn,
    showInMenu: true,
    icon: AccountGroup,
  },
  {
    path: '/my-validation-requests',
    exact: true,
    component: UserSentValidationRequests,
    isAvailable: isLoggedIn,
    showInMenu: true,
    icon: AccountCheck,
    parent: MENU_GROUPS.IDENTITY,
  },
  {
    path: '/validation-requests',
    exact: true,
    component: NotaryValidationRequests,
    isAvailable: isNotary,
    showInMenu: true,
    icon: Animation,
    parent: MENU_GROUPS.NOTARY,
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    isAvailable: isLoggedIn,
  },
  {
    path: '/',
    exact: true,
    component: Home,
    isAvailable: () => true,
  },
];

export const getApplicationRoutes = (userInfo) => {
  return routes.filter((route) => isRouteAvailable(route, userInfo));
};

export const getMenuRoutes = (userInfo) => {
  const availableMenuRoutes = getApplicationRoutes(userInfo).filter((route) => route.showInMenu);

  const groupedRoutes = groupBy(availableMenuRoutes, 'parent');

  let menuRoutes = [];

  Object.keys(groupedRoutes)
    .forEach(key => {
      if (key === 'undefined') {
        // here are the routes that have no parent
        menuRoutes = [ ...menuRoutes, ...groupedRoutes[key] ];
      }
      else {
        menuRoutes = [ ...menuRoutes, { name: key, children: groupedRoutes[key] } ];
      }
    });

  return menuRoutes;
};
