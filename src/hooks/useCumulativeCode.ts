import { useTypedSelector } from "./useTypedSelector";
import { ICell } from '../state';

//function declaration for use within cumulative code 
function show(value: any){
  let root = document.querySelector('#root');
  if (root) {
    if (value.$$typeof && value.props){
      // @ts-ignore ReactDOM will need to be imported within code cell by user
      ReactDOM.render(value, root);
    }
    else if (typeof value === 'object') {
      value = JSON.stringify(value);
      root.innerHTML = value;
    }
    else{
      root.innerHTML = value;
    }
  }
}

export const useCumulativeCode = (cell: ICell) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    let pattern = [ `${show}`];
    for(let i = 0; cell.id !== order[i]; i++){
      if (data[order[i]].type === 'code') pattern.push(data[order[i]].content)
    }
    if (cell.type === 'code') pattern.push(cell.content);
    return pattern;
  });
}