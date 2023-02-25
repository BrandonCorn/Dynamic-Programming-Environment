import './action-bar.css';
import { useAction } from "../../../hooks/useAction";
import SmallDeleteButton from "../../atoms/Buttons/FontAwesomeButtons/DeleteButton/SmallDeleteButton";
import SmallUpButton from "../../atoms/Buttons/FontAwesomeButtons/UpButton/SmallUpButton";
import SmallDownButton from "../../atoms/Buttons/FontAwesomeButtons/DownButton/SmallDownButton";

interface IActionBar {
  id: string;
}

const ActionBar: React.FC<IActionBar> = ({ id }) => {
  const { moveCell, deleteCell } = useAction();

  const handleMoveCellUp = () => {
    moveCell(id, 'up');
  }

  const handleMoveCellDown = () => {
    moveCell(id, 'down');
  }

  const handleDeleteCell = () => {
    deleteCell(id);
  }

  return (
    <div className='action-bar'>
      <SmallUpButton onClick={handleMoveCellUp} />
      <SmallDownButton onClick={handleMoveCellDown} />
      <SmallDeleteButton onClick={handleDeleteCell} />
    </div>
  )
}

export default ActionBar;