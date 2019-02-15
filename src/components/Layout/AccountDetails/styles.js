/**
 * Created by vladtomsa on 11/10/2018
 */
import { toolbarRadius } from '../Header/styles';

const styles = (theme) => {
  return {
    root: {
      borderRadius: toolbarRadius,
      marginBottom: '16px',
      '& h2': {
        wordBreak: 'break-all',
      },
      '& >div': {
        // paddingTop: 16,
        paddingBottom: '16px !important',
      },
    },
    accountDetails: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: 16,
      },
    },
    accountButton: {
      '& *': {
        color: '#FFFFFF',
      },
    },
    invitationContainer: {
      background: 'linear-gradient(45deg, #252d43, #33394d)',
      borderRadius: '0 0 10px 10px',
    },
    invitationContainerContent: {
      paddingBottom: '0 !important',
      '& > div': {
        position: 'relative',
        '& .link-container': {
          margin: '0 28px 20px',
          padding: '8px 16px',
          '& h3': {
            wordBreak: 'break-all',
          },
        },
        '& button': {
          position: 'absolute',
          right: 0,
          top: 6,
        },
      },
    },
    inviteOthers: {
      margin: '0 28px',
      '& *': {
        color: '#FFF',
      },
    },
    tab: {
      '& *': {
        color: '#FFF',
      },
    },
    smallTabs: {
      minHeight: 36,
    },
    avatar: {
      background: 'rgba(0,0,0,0)',
    },
    check: {
      color: theme.palette.secondary.main,
    },
    listItem: {
      '& span': {
        color: 'rgba(255,255,255,0.87)',
      },
      '& p': {
        color: 'rgba(255,255,255,0.54)',
      },
    },
  };
};

export default styles;
