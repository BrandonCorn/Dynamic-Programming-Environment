import { combineReducers } from 'redux';
import cellReducers from './cells';

const reducers = combineReducers({
  cells: cellReducers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;