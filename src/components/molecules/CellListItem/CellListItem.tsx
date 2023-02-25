import { ICell } from "../../../state";
import MarkdownCell from "../../organisms/MarkdownCell/MarkdownCell";
import CodeCell from '../../organisms/CodeCell/CodeCell';
import ActionBar from "../ActionBar/ActionBar";

interface ICellListItem {
  cell: ICell
}

const CellListItem: React.FC<ICellListItem> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = <CodeCell cell={cell}/>
  }
  else {
    child = <MarkdownCell cell={cell}/>
  }


  return (
    <div>
      <ActionBar id={cell.id} />
      {child}
    </div>
  )
}

export default CellListItem;