import '../../molecules/AddCell/add-cell.css'
import { Fragment } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CellListItem from '../../molecules/CellListItem/CellListItem';
import AddCell from '../../molecules/AddCell/AddCell';

const CellList: React.FC = () => {
  const cellState = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id => data[id]));
  });

  const buildList = () => {
    return cellState.map((cell, i) => (
      <Fragment key={cell.id}>
        <AddCell nextCellId={cell.id}/>
        <CellListItem cell={cell} />
      </Fragment>
      )
    )
  }

  return (
    <div>
      {buildList()}
      <div className = {cellState.length === 0 ? 'is-visible' : ''}>
        <AddCell nextCellId={null} />
      </div>
    </div>
  )
}

export default CellList;