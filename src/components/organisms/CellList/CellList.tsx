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

  // const buildList = () => {
  //   return cellState.map(cell => {
  //     if (cell.type === 'code') {
  //       return (
  //       <div key ={cell.id} style = {{margin: '25px'}}> 
  //         <CodeCell cell={cell}/> 
  //       </div>
  //       )
  //     }
  //     else if (cell.type === 'markdown') {
  //       return <MarkdownCell key={cell.id} cell={cell}/>
  //     }
  //   })
  // }

  useEffect(() => {

  },[cellState])
  return (
    <div>
      {buildList()}
    </div>
  )
}

export default CellList;