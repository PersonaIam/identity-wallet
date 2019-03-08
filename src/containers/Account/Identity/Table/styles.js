/**
 * Created by vladtomsa on 16/11/2018
 */
import amber from '@material-ui/core/colors/amber';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import {ATTRIBUTE_EXPIRATIONS_STATES} from "constants/index";

const styles = (theme) => {
  return {
    [ATTRIBUTE_EXPIRATIONS_STATES.WILL_EXPIRE]: {
      background: 'linear-gradient(60deg,#ffa726,#fb8c00)',
      '& *': {
        color: '#FFF',
      },
    },
    [ATTRIBUTE_EXPIRATIONS_STATES.EXPIRED]: {
      background: 'linear-gradient(60deg,#ef5350,#e53935)',
      '& *': {
        color: '#FFF',
      },
    },
    attributePaper: {
      margin: '18px 0'
    },
    avatar: {
      background: 'rgba(0,0,0,0.1)',
    },
    timelineCard: {
      borderRadius: 8,
      marginTop: 16,
    },
    statusIcon: {
      fontSize: 18,
      marginRight: 4,
    },
    active: {
      color: lightGreen['A400'],
    },
    inactive: {
      color: amber[500],
    },
    rejected: {
      color: red[500],
    },
    badge: {
      color: '#FFF !important',
      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      boxShadow: theme.shadows[6],
      '&.disabled': {
        background: `linear-gradient(45deg, ${grey[400]}, ${grey[500]})`,
      }
    },
    warningBadge: {
      background: `linear-gradient(45deg, ${amber[600]}, ${amber[900]})`,
    },
    errorBadge: {
      background: `linear-gradient(45deg, ${red[600]}, ${red[900]})`,
    },
    infoIconRight: {
      color: theme.palette.text.secondary,
      fontSize: 20,
      marginLeft: 4,
    },
  };
};

export default styles;
