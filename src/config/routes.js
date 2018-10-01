import Loadable from 'react-loadable';
import Loading from 'components/Loading';

const AccountCreate = Loadable({
  loader: () => import('containers/Account/Create'),
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
    path: '/account/confirmation/:token',
    exact: true,
    component: AccountCreate,
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
