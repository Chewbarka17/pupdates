import { applyMiddleware, createStore } from 'redux';

import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../src/reducers/index';

const middleware = applyMiddleware(promise(), thunk, createLogger());

export default createStore(reducer, middleware);
