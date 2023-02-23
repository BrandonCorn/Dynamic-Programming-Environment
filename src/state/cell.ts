import { v4 as uuidv4 } from 'uuid';

export type CellTypes = 'code' | 'markdown';

export interface ICell {
  id: string;
  type: CellTypes;
  content: string;
}

export const generateCellId = () => {
  return uuidv4();
}