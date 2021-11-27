import {configureStore} from '@reduxjs/toolkit';
import _ from 'lodash';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {registerStore as registerClient} from '../common/client';
import {AppState, AppStore} from './state.model';
import reducer from './state.reducer';
import saga from './state.saga';

export function createStore(): AppStore {
  let sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer,
    middleware: _.filter([
      sagaMiddleware,
      __DEV__ && createLogger({
        predicate: (getState: () => AppState) => {
          let state = getState();
          return state.app.logging;
        }
      })
    ])
  });
  sagaMiddleware.run(saga);
  register(store);
  return store;
}

// Pass store instance to apis that needed after configuration.
function register(store: AppStore): void {
  registerClient(store);
}
