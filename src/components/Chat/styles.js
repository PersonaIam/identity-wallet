/**
 * Created by vladtomsa on 18/01/2019
 */
export default (theme) => {
  return {
    chat: {
      position: 'fixed',
      bottom: 24,
      right: 30,
      zIndex: 1000,
    },
    badge: {
      color: '#FFF !important',
      background: `linear-gradient(60deg,#f5700c,#ff9800)`,
      width: 28,
      height: 28,
      boxShadow: theme.shadows[6],
    }
  }
}
