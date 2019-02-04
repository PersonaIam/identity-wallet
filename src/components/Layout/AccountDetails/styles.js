/**
 * Created by vladtomsa on 11/10/2018
 */
import { toolbarRadius } from '../Header/styles';

const styles = () => {
  return {
    root: {
      borderRadius: toolbarRadius,
      marginBottom: '16px',
      '& h2': {
        wordBreak: 'break-all',
      },
      '& >div': {
        paddingTop: 16,
        paddingBottom: '16px !important',
      },
    },
    accountDetails: {
      marginLeft: 16,
    },
    accountButton: {
      '& *': {
        color: '#FFFFFF',
      },
    },
    invitationContainer: {
      background: 'linear-gradient(45deg, #252d43, #33394d)',
      borderRadius: '0 0 10px 10px',
      '& > h3': {
        color: 'rgba(255,255,255,0.9)'
      },
      '& > div': {
        position: 'relative',
        '& div': {
          margin: '0 28px 20px',
          padding: 16,
        },
        '& button': {
          position: 'absolute',
          right: 0,
          top: 10,
        }
      },
    },
  };
};

export default styles;
