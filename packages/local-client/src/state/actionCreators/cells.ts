import { CellActionTypes } from '../actionTypes';
import { CellDirection, UpdateCellAction, MoveCellAction, DeleteCellAction, InsertCellAfterAction } from '../actions/cells';
import { CellTypes } from '../cell';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: CellActionTypes.UPDATE_CELL,
    payload: {
      id, 
      content,
    }
  }
}

export const moveCell = (id: string, direction: CellDirection): MoveCellAction => {
  return {
    type: CellActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    }
  }
}

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: CellActionTypes.DELETE_CELL,
    payload: id
  }
}

export const insertAfterCell = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
  return {
    type: CellActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType
    }
  }
}