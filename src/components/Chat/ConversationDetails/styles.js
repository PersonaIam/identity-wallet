/**
 * Created by vladtomsa on 22/01/2019
 */
export default (theme) => {
  return {
    toolbar: {
      '& *': {
        color: '#FFF !important'
      },
    },
    chatToolbarAddress: {
      overflow: 'hidden',
      maxWidth: '75vw',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  };
};
