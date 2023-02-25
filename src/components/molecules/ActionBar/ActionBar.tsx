import { useAction } from "../../../hooks/useAction";

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
    <div>
      <button onClick={handleMoveCellUp}> Up </button>
      <button onClick={handleMoveCellDown}> Down </button>
      <button onClick={handleDeleteCell}> Delete </button>
    </div>
  )
}

export default ActionBar;