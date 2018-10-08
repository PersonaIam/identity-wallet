import Loadable from 'react-loadable';
import Loading from 'components/Loading';

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
