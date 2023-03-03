import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { CellActionTypes } from './actionTypes';

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>


// store.dispatch({
//   type: CellActionTypes.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: 'code'
//   }
// });
// store.dispatch({
//   type: CellActionTypes.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: 'markdown'
//   }
// });




console.log('store ', store.getState());


