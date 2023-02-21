import React, { useState, useEffect } from 'react';
import CodeEditor from '../../molecules/CodeEditor/CodeEditor';
import CodePreview from '../../atoms/IFrames/CodePreviewIFrame/CodePreviewIFrame';
import SubmitButton from '../../atoms/Buttons/SubmitButton/SubmitButton';
import bundle from '../../../helpers/esbuild';
import Resizable from '../../atoms/Resizable/Resizable';

const CodeBlock: React.FC = (props) => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');


  const handleInput = (value:string) => {
    setInput(value);
  }

  const handleButtonClick = async () => {
    const bundledCode = await bundle(input);
    if (bundledCode) setCode(bundledCode);
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundledCode = await bundle(input);
      if (bundledCode) setCode(bundledCode);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [input])

  return (
    <Resizable direction='vertical'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor 
            initialValue ={'const a = 1;'} 
            onChange={handleInput}
          />
        </Resizable>
          <CodePreview code={code} />
      </div>
    </Resizable>
  )
}

export default CodeBlock;