import './code-cell.css';
import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
import CodeEditor from '../../molecules/CodeEditor/CodeEditor';
import CodePreview from '../../atoms/IFrames/CodePreviewIFrame/CodePreviewIFrame';
import Resizable from '../../atoms/Resizable/Resizable';
import { ICell } from '../../../state/cell';
import { useAction } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

interface ICodeCellProps {
  cell: ICell
}

const CodeCell: React.FC<ICodeCellProps> = ({cell}) => {
  const { id, content } = cell;
  const { updateCell, createBundle } = useAction();
  const bundle = useTypedSelector((state) => state.bundles[id]);
  
  //gathers code from previous cells for reference when bundling
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    let pattern = [ `${show}`];
    for(let i = 0; id !== order[i]; i++){
      if (data[order[i]].type === 'code') pattern.push(data[order[i]].content)
    }
    pattern.push(cell.content);
    return pattern;
  });

  //function declaration for use within cumulative code 
  function show(value: any){
    let root = document.querySelector('#root');
    if (root) {
      if (value.$$typeof && value.props){
        //@ts-ignore ReactDOM will need to be imported within code cell by user
        ReactDOM.render(value, root);
      }
      else if (typeof value === 'object') {
        value = JSON.stringify(value);
        root.innerHTML = value;
      }
    }
  }

  const handleInput = (value:string) => {
    updateCell(id, value);
    
  }

  useEffect(() => {
    if (!bundle){
      createBundle(id, cumulativeCode.join('\n')); 
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(id, cumulativeCode.join('\n'))
    }, 750);

    return () => {
      clearTimeout(timer);
    }
  }, [content, id, createBundle]);

  const renderPreviewOrLoad = !bundle || bundle.loading 
    ? (
      <div className = 'progress-main'>
        <div className = 'progress-cover'> 
          <progress className = 'progress is-success is-medium' max='100'> Loading </progress> 
        </div>
      </div> )
    : ( <CodePreview code={bundle.code} bundleStatus={bundle.error} /> );

  // const renderPreviewOrLoad = !bundle || bundle.loading 
  // ? ( <CodePreview code={bundle.code} bundleStatus={bundle.error} /> )
  // : (<div className = 'progress-cover'> <progress className = 'progress is-info is-large'> Loading </progress> </div> )
   


  return (
    <Resizable direction='vertical'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor 
            initialValue ={content} 
            onChange={handleInput}
          />
        </Resizable>
        {renderPreviewOrLoad}
      </div>
    </Resizable>
  )
}

export default CodeCell;