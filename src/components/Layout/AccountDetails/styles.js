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
  };
};

export default styles;
