import { useDispatch } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { CellActionTypes } from './actionTypes';

export const store = createStore(reducers, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>


store.dispatch({
  type: CellActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'code'
  }
})

store.dispatch({
  type: CellActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'markdown'
  }
})

store.dispatch({
  type: CellActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'code'
  }
});

console.log('store ', store.getState());


