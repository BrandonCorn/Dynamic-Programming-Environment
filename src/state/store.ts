import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { CellActionTypes } from './actionTypes';

export const store = createStore(reducers, applyMiddleware(thunk));




