/**
 * Created by vladtomsa on 01/11/2018
 */
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

global.cancelAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
