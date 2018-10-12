import Loadable from 'react-loadable';
import Loading from 'components/Loading';
import AccountDetailsIcon from 'mdi-material-ui/AccountCardDetails';
import DashboardIcon from 'mdi-material-ui/ViewDashboard';

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

const Register = Loadable({
  loader: () => import('containers/Register'),
  loading: Loading,
});


const isLoggedIn = (userInfo) => !!(userInfo);

const isRouteAvailable = (route, userInfo) => (route.isAvailable === undefined || route.isAvailable(userInfo));

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

export const getMenuRoutes = () => {
  return routes.filter((route) => route.showInMenu);
};
