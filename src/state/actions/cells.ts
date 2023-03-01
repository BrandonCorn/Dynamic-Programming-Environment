import { CellActionTypes } from '../actionTypes';
import { CellTypes } from '../cell';

export type CellDirection = 'up' | 'down';

export interface UpdateCellAction {
  type: CellActionTypes.UPDATE_CELL,
  payload: {
    id: string;
    content: string;
  }
}

export interface MoveCellAction {
  type: CellActionTypes.MOVE_CELL,
  payload: {
    id: string;
    direction: CellDirection;
  }
}

export interface DeleteCellAction { 
  type: CellActionTypes.DELETE_CELL,
  payload: string;
}

export interface InsertCellAfterAction {
  type: CellActionTypes.INSERT_CELL_AFTER,
  payload: {
    id: string | null;
    type: CellTypes;
  }
}

export type CellActions = UpdateCellAction | MoveCellAction | DeleteCellAction | InsertCellAfterAction;