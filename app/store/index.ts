import { routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import {
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Store,
  StoreEnhancer
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createRootReducer } from './root-reducer';
import { ApplicationState, initialAppState } from './types';

export const sagaMiddleware = createSagaMiddleware();
export const history = createHistory();
const composeEnhancers = compose;
const middleware: Middleware[] = [routerMiddleware(history), sagaMiddleware];

export function configureStore(defaultState: ApplicationState = initialAppState): Store<ApplicationState> {
  const store: Store<ApplicationState> = createStore(
    // connectRouter(history)(rootReducer, counterAction),
    createRootReducer(history),
    defaultState,
    composeEnhancers(applyMiddleware(...middleware) as StoreEnhancer<any>)
  );
  return store;
}
