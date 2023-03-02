import './code-cell.css';
import { useEffect } from 'react';
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

  const handleInput = (value:string) => {
    updateCell(id, value);
    
  }

  useEffect(() => {
    if (!bundle){
      createBundle(id, content); 
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(id, content)
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