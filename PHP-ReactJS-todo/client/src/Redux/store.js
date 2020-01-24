import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers';

import initialApp from './sagas';


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process.env.NODE_ENV !== 'production'
    ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const saga = createSagaMiddleware();

const store = createStore(
    reducers, composeEnhancers(applyMiddleware(saga))
);

saga.run(initialApp);

export default store;