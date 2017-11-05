import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/es/storage';

import rootReducer from '../src/reducers/index';

const config = {
  key: 'root', // key is required
  storage, // storage is now required
};

const reducer = persistReducer(config, rootReducer);
const middleware = applyMiddleware(promise(), thunk, createLogger());

function configureStore() {
  const store = createStore(reducer, middleware);
  const persistor = persistStore(store);
  persistor.purge();
  return { persistor, store };
}

export default configureStore;
