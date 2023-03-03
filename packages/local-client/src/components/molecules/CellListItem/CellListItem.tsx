import './cell-list-item.css';
import { ICell } from "../../../state";
import MarkdownCell from "../../organisms/MarkdownCell/MarkdownCell";
import CodeCell from '../../organisms/CodeCell/CodeCell';
import ActionBar from "../ActionBar/ActionBar";

interface ICellListItemProps {
  cell: ICell
}

const CellListItem: React.FC<ICellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = <>
      <div className='action-bar-wrapper'>
        <ActionBar id={cell.id} />
      </div>
      <CodeCell cell={cell}/>
    </>
  }
  else {
    child = <>
      <MarkdownCell cell={cell}/>
      <ActionBar id={cell.id} />
      </>
  }


  return (
    <div className='cell-list-item'>
      {child}
    </div>
  )
}

export default CellListItem;