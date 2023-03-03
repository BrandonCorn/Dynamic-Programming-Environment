import { ICell } from '../../../state';
import MarkdownEditor from '../../molecules/MarkdownEditor/MarkdownEditor';

interface IMarkdownCellProps {
  cell: ICell
}

const MarkdownCell: React.FC<IMarkdownCellProps> = ({ cell }) => {
  return (
    <MarkdownEditor id={cell.id} content={cell.content} />
  )
}

export default MarkdownCell;