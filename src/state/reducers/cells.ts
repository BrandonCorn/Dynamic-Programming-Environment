import { CellActionTypes } from '../actionTypes';
import { CellActions } from '../actions';
import { ICell } from '../cell';

interface ICellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: ICell
  }
}

const initialState = {
  loading: false,
  error: null,
  order: [],
  data: {},
}

const reducer = (
  state: ICellState = initialState, 
  action: CellActions
): ICellState => {
  switch(action.type){
    case CellActionTypes.UPDATE_CELL:
      const { id, content } = action.payload;
      return {
        ...state,
        data: {
          ...state.data, 
          [id]: {
            ...state.data[id],
            content,
          }
        }
      }
    case CellActionTypes.DELETE_CELL:
      
    case CellActionTypes.MOVE_CELL:
      return state;
    case CellActionTypes.INSERT_CELL_BEFORE:
      return state;
    default: 
      return state;
  }
}

export default reducer;