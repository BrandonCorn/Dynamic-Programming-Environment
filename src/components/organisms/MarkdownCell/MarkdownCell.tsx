import { ICell } from '../../../state';
import MarkdownEditor from '../../molecules/MarkdownEditor/MarkdownEditor';

interface IMarkdownCell {
  cell: ICell
}

const MarkdownCell: React.FC<IMarkdownCell> = ({ cell }) => {
  return (
    <MarkdownEditor cell={cell}/>
  )
}

export default MarkdownCell;