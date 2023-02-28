import { CellActionTypes } from '../actionTypes';
import { CellActions,
   InsertCellAfterAction,
    DeleteCellAction, MoveCellAction, UpdateCellAction } from '../actions';
import { ICell, generateCellId } from '../cell';
import { produce } from 'immer';

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
  data: {
  },
}

//update a cell fetched by it's id
const updateCell = (
  state: ICellState = initialState, 
  action: UpdateCellAction
  ): ICellState | void => {
    const { id, content } = action.payload;
    state.data[id].content = content;
    return state;
};

//delete a cell with it's id and update order list
const deleteCell = (
  state: ICellState = initialState,
  action: DeleteCellAction 
): ICellState | void => {
  const id = action.payload
  state.order = state.order.filter(cellId => cellId !== id);
  delete state.data[id];
  return state;
};

//Move cells up or down in the order list by id
const moveCell = (
  state: ICellState = initialState,
  action: MoveCellAction 
): ICellState | void => {
  const { id } = action.payload;
  let indexOf = state.order.findIndex(cellId => cellId === id);
  const target = action.payload.direction === 'up' ? indexOf-1 : indexOf+1;
  if (target < 0 || target > state.order.length -1) return;
  state.order[indexOf] = state.order[target];
  state.order[target] = action.payload.id;
  return state;
}

//create new cell in specific space of order list or else place at the end of the order list
const insertAfterCell = (
  state: ICellState,
  action: InsertCellAfterAction
): ICellState | void => {
  const { id } = action.payload;
  const cell = {
    id: generateCellId(),
    type: action.payload.type,
    content: '',
  }

  state.data[cell.id] = cell;
  let newIndex = state.order.findIndex((cellId) => cellId === id);
  if (newIndex < 0) state.order.unshift(cell.id);
  else if (newIndex >= 0) state.order.splice(newIndex+1, 0, cell.id);

  return state;
}

//Root Cell Reducer, use combine reducers to separate into children if necessary
const reducer = produce((
  state: ICellState = initialState, 
  action: CellActions
): ICellState | void => {
  switch(action.type){
    case CellActionTypes.UPDATE_CELL:
      updateCell(state, action);
      return state;

    case CellActionTypes.DELETE_CELL:
      deleteCell(state, action);
      return state;

    case CellActionTypes.MOVE_CELL:
      moveCell(state, action);
      return state;

    case CellActionTypes.INSERT_CELL_AFTER:
      insertAfterCell(state, action);
      return state;
    default: 
      return state;
  }
}, initialState);

export default reducer;
