export type CellTypes = 'code' | 'markdown';

export interface ICell {
  id: string;
  type: CellTypes;
  content: string;
}