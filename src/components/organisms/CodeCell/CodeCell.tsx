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
  }, [content, id, createBundle])

  return (
    <Resizable direction='vertical'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor 
            initialValue ={content} 
            onChange={handleInput}
          />
        </Resizable>
          {!!bundle ? <CodePreview code={bundle.code} bundleStatus={bundle.error} /> : '' }
      </div>
    </Resizable>
  )
}

export default CodeCell;