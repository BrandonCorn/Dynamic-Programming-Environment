import React, { useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import MarkdownCell from '../MarkdownCell/MarkdownCell';
import CodeCell from '../CodeCell/CodeCell';

const CellList: React.FC = () => {
  const cellState = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id => data[id]));
  });

  const buildList = () => {
    return cellState.map(cell => {
      if (cell.type === 'code') {
        return (
        <div style = {{margin: '25px'}}> 
          <CodeCell key ={cell.id} /> 
        </div>
        )
      }
      else if (cell.type === 'markdown') {
        return <MarkdownCell key={cell.id} />
      }
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