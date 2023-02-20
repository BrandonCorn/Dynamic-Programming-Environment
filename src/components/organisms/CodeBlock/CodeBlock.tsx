import React, { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import CodeEditor from '../../molecules/CodeEditor/CodeEditor';
import CodePreview from '../../atoms/IFrames/CodePreviewIFrame/CodePreviewIFrame';
import SubmitButton from '../../atoms/Buttons/SubmitButton/SubmitButton';
import { unpkgPathPlugin } from '../../../helpers/unpkgPlugins/plugins/unpkgPlugin';
import { fetchPlugin } from '../../../helpers/unpkgPlugins/plugins/fetchPlugin';

const CodeBlock: React.FC = (props) => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const esBuildRef = useRef<boolean>();

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.8/esbuild.wasm'
    })

    esBuildRef.current = true;
  }

  useEffect(() => {
    startService();
  },[]);

  const handleInput = (value:string) => {
    setInput(value);
  }

  const handleButtonClick = async () => {
    if (!esBuildRef.current) return;

    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins:[
        unpkgPathPlugin(input),
        fetchPlugin(input),
      ],
      define: {
        'process.env.NODE_ENV': "'production'",
        global: 'window',
      }
    });

    setCode(result.outputFiles[0].text);
  }

  return (
    <div>
      <CodeEditor 
        initialValue ={'const a = 1;'} 
        onChange={handleInput}
        /> 
      <SubmitButton onClick={handleButtonClick}/>
      <CodePreview code={code} />
    </div>
  )
}

export default CodeBlock;