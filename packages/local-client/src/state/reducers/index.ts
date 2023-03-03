import { combineReducers } from 'redux';
import cellReducers from './cells';
import bundlesReducer from './bundles';

const reducers = combineReducers({
  cells: cellReducers,
  bundles: bundlesReducer,
});

export default reducers;


