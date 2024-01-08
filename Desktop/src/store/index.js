// import { applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import persistReducers from './persistReducers';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware];

const store = createStore(
  persistReducers(rootReducer),
  applyMiddleware(sagaMiddleware),
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
