import './add-cell.css';
import { useAction} from "../../../hooks/useAction";
import GenericButton from "../../atoms/Buttons/GenericButton/GenericButton";

interface IAddCellProps {
  prevCellId: string | null;
}

const AddCell: React.FC<IAddCellProps> = ({prevCellId}) => {
  const {insertAfterCell } = useAction();
  
  const handleClickCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    insertAfterCell(prevCellId, 'code');
  }

  const handleClickMarkdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    insertAfterCell(prevCellId, 'markdown');
  } 

  return (
    <div className='add-cell'>
      <div className='add-buttons'>
        <GenericButton className = 'button is-primary is-rounded is-small' content='Markdown' onClick={handleClickMarkdown}>
          <span style = {{marginRight: '2px'}} className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
        </GenericButton>
        <GenericButton className = 'button is-primary is-rounded is-small' content='Code' onClick={handleClickCode}>
          <span style = {{marginRight: '2px'}} className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
        </GenericButton>
      </div>
      <div className='divider'></div>
    </div>
  )
}

export default AddCell;