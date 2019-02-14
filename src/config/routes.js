import Loadable from 'react-loadable';
import Loading from 'components/Loading';
import AccountDetailsIcon from 'mdi-material-ui/AccountCardDetails';
import AccountGroup from 'mdi-material-ui/AccountGroup';
import Animation from 'mdi-material-ui/Animation';
import AccountCheck from 'mdi-material-ui/AccountCheck';
import Bank from 'mdi-material-ui/Bank';
import DashboardIcon from 'mdi-material-ui/ViewDashboard';
import FileMoveIcon from 'mdi-material-ui/FileMove';
import InformationVariant from 'mdi-material-ui/InformationVariant';
import MyServicesIcon from 'mdi-material-ui/FileDocumentBoxMultiple';
import { USER_ROLES } from 'constants/index';
import groupBy from 'lodash/groupBy';

const AccountCreate = Loadable({
  loader: () => import('containers/Account/Confirmation'),
  loading: Loading,
});

const AdminProviders = Loadable({
  loader: () => import('containers/Administration/Providers'),
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

const IdentityUse = Loadable({
  loader: () => import('containers/Account/IdentityUse'),
  loading: Loading,
});

const Invite = Loadable({
  loader: () => import('containers/Invite'),
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

const Providers = Loadable({
  loader: () => import('containers/Providers'),
  loading: Loading,
});


const ProviderDetails = Loadable({
  loader: () => import('containers/Providers/Details'),
  loading: Loading,
});

const ProviderServices = Loadable({
  loader: () => import('containers/Provider/Services'),
  loading: Loading,
});

const ProviderIdentityUseRequests = Loadable({
  loader: () => import('containers/Provider/IdentityUse'),
  loading: Loading,
});

const ProviderIdentityUseRequestsDetails = Loadable({
  loader: () => import('containers/Provider/IdentityUse/Detail'),
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

const isAdmin = (userInfo) => isLoggedIn(userInfo) && userInfo.userRoleId === USER_ROLES.SYS_ADMIN;

const isNotary = (userInfo) => isLoggedIn(userInfo) && userInfo.userRoleId === USER_ROLES.NOTARY;

const isProvider = (userInfo) => isLoggedIn(userInfo) && userInfo.userRoleId === USER_ROLES.PROVIDER;

const isRouteAvailable = (route, userInfo) => (route.isAvailable === undefined || route.isAvailable(userInfo));

export const MENU_GROUPS = {
  IDENTITY: 'Identity',
  NOTARY: 'Notary',
  PROVIDER: 'Provider',
  ADMIN: 'Administration',
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
    icon: InformationVariant,
    parent: MENU_GROUPS.IDENTITY,
  },
  {
    path: '/identity-use',
    exact: true,
    component: IdentityUse,
    isAvailable: isLoggedIn,
    showInMenu: true,
    icon: AccountDetailsIcon,
    parent: MENU_GROUPS.IDENTITY,
  },
  {
    path: '/invite/:referralCode',
    exact: true,
    component: Invite,
    isAvailable: () => true,
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
    path: '/providers',
    exact: true,
    component: Providers,
    isAvailable: isLoggedIn,
    showInMenu: true,
    icon: Bank,
  },
  {
    path: '/providers/:personaAddress',
    exact: true,
    component: ProviderDetails,
    isAvailable: isLoggedIn,
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
    isAvailable: (userInfo) => isNotary(userInfo) || isProvider(userInfo),
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
    path: '/administration/providers',
    exact: true,
    component: AdminProviders,
    isAvailable: isAdmin,
    showInMenu: true,
    icon: DashboardIcon,
    parent: MENU_GROUPS.ADMIN,
  },
  {
    path: '/provider/services',
    exact: true,
    component: ProviderServices,
    isAvailable: isProvider,
    showInMenu: true,
    icon: MyServicesIcon,
    parent: MENU_GROUPS.PROVIDER,
  },
  {
    path: '/provider/identity-use-requests',
    exact: true,
    component: ProviderIdentityUseRequests,
    isAvailable: isProvider,
    showInMenu: true,
    icon: FileMoveIcon,
    parent: MENU_GROUPS.PROVIDER,
  },
  {
    path: '/provider/identity-use-requests/:serviceId/:owner',
    exact: true,
    component: ProviderIdentityUseRequestsDetails,
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
