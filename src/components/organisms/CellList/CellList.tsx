import '../../molecules/AddCell/add-cell.css'
import { useEffect, Fragment } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CellListItem from '../../molecules/CellListItem/CellListItem';
import AddCell from '../../molecules/AddCell/AddCell';

const CellList: React.FC = () => {
  const cellState = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id => data[id]));
  });

  const buildList = cellState.map((cell, i) => (
      <Fragment key={cell.id}>
        <CellListItem cell={cell} />
        <AddCell prevCellId={cell.id}/>
      </Fragment>
    )
  )

  useEffect(() => {

  }, [cellState])
  

  return (
    <div>
      <div className = {cellState.length === 0 ? 'is-visible' : 'lasjdflkjsdfl'}>
        <AddCell prevCellId={null} />
      </div>
      {buildList}
    </div>
  )
}

export default CellList;