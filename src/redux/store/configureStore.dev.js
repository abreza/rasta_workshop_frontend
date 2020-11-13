import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import api from '../middleware/api/api';
import rootReducer from '../reducers';
import DevTools from '../../containers/DevTools';
import reduxWebsocket from '@giantmachines/redux-websocket';
import receiveMessage from '../middleware/socket/receiveMessage';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    { Intl: { locale: 'fa' }, ...preloadedState },
    compose(
      applyMiddleware(
        thunk,
        api,
        receiveMessage,
        reduxWebsocket({ reconnectOnClose: true }),
        createLogger()
      ),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
