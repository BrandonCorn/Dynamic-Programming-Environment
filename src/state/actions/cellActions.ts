import { CellActionTypes } from '../actionTypes';
import { CellTypes } from '../cell';

interface UpdateCellAction {
  type: CellActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  }
}

interface MoveCellAction {
  type: CellActionTypes.MOVE_CELL;
  payload: {
    id: string,
    direction: 'up' | 'down'
  }
}

interface DeleteCellAction { 
  type: CellActionTypes.DELETE_CELL;
  payload: {
    id: string;
  }
}

interface InsertCellBeforeAction {
  type: CellActionTypes.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellTypes
  }
}

export type CellActions = UpdateCellAction | MoveCellAction | DeleteCellAction | InsertCellBeforeAction