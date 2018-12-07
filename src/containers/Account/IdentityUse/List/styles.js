/**
 * Created by vladtomsa on 23/11/2018
 */
import { IDENTITY_USE_REQUEST_STATUSES } from 'constants/index';
import { amber, red, green } from '@material-ui/core/colors';

const styles = (theme) => ({
  avatarContainer: {
    background: `linear-gradient(45deg, #01579B, #323561)`,
    padding: 24,
  },
  avatar: {
    maxWidth: 340,
    width: '90%',
  },
  identityRequestCard: {
    position: 'relative',
    '& img': {
      width: '100%'
    },
  },
  buttonBase: {
    display: 'block',
    width: '100%',
  },
  identityRequestInfo: {
    background: 'rgba(0,0,0,0.8)',
    bottom: 0,
    left: 0,
    padding: 16,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    '& h2': {
      color: '#FFF'
    },
    '& h3': {
      color: 'rgba(255,255,255,0.75)'
    },
  },
  [IDENTITY_USE_REQUEST_STATUSES.ACTIVE]: {
    color: green[500],
  },
  [IDENTITY_USE_REQUEST_STATUSES.DECLINED]: {
    color: red[500],
  },
  [IDENTITY_USE_REQUEST_STATUSES.ENDED]: {
    color: amber[500],
  },
});

export default styles;
