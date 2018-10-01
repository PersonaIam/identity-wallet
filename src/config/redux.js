/**
 * Created by vladtomsa on 26/09/2018
 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

export const history = createHistory();

export const rootReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
});

export default function configureStore(initialState) {
  const routeMiddleware = routerMiddleware(history);

  const middlewares = [
    thunk,
    routeMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false, // Prevent recomputing reducers for `replaceReducer`
      })
      : compose;
  /* eslint-enable */

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  return store;
}
