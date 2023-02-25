import { useState, useEffect } from 'react';
import CodeEditor from '../../molecules/CodeEditor/CodeEditor';
import CodePreview from '../../atoms/IFrames/CodePreviewIFrame/CodePreviewIFrame';
import bundle from '../../../helpers/esbuild';
import Resizable from '../../atoms/Resizable/Resizable';
import { ICell } from '../../../state/cell';
import { useAction } from '../../../hooks/useAction';

interface ICodeCell {
  cell: ICell
}

const CodeCell: React.FC<ICodeCell> = ({cell}) => {
  const { id, content } = cell;
  const { updateCell } = useAction();
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');


  const handleInput = (value:string) => {
    updateCell(id, value);
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundledCode = await bundle(content);
      setCode(bundledCode.code);
      setErr(bundledCode.error);
    }, 2000);

    return () => {
      clearTimeout(timer);
    }
  }, [content])

  return (
    <Resizable direction='vertical'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor 
            initialValue ={content} 
            onChange={handleInput}
          />
        </Resizable>
          <CodePreview code={code} bundleStatus={err} />
      </div>
    </Resizable>
  )
}

export default CodeCell;