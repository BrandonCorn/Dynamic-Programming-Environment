import { useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CellListItem from '../../molecules/CellListItem/CellListItem';

const CellList: React.FC = () => {
  const cellState = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id => data[id]));
  });

  const buildList = () => {
    return cellState.map(cell => {
      return <CellListItem key={cell.id} cell={cell} />
    })
  }

  useEffect(() => {

  },[cellState])
  return (
    <div>
      {buildList()}
    </div>
  )
}

export default CellList;