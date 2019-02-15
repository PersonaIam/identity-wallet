/**
 * Created by vladtomsa on 03/10/2018
 */
export default (theme) => {
  return {
    identity: {
      padding: 16,
      '& img': {
        width: '90%',
        maxWidth: 270,
      },
      '& p': {
        fontSize: '0.85rem',
        lineHeight: '1.75rem',
      },
      '& svg': {
        marginRight: 6,
      },
    },
    passphrase: {
      // background: '#EFEFEF',
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      marginBottom: 22,
      marginTop: 22,
      padding: 16,
      textAlign: 'justify',
      '& *': {
        color: '#FFFFFF'
      },
    },
  }
};
