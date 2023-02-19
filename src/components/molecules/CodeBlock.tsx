import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import * as esbuild from 'esbuild-wasm';
import CodeInputTextArea from '../atoms/TextArea/CodeInputTextArea';
import CodeCellDisplay from '../atoms/Iframes/CodeCell';
import BasicH1 from '../atoms/Headings/BasicH1';
import SubmitButton from '../atoms/Buttons/SubmitButton';
import { unpkgPathPlugin } from '../../helpers/unpkgPlugins/plugins/unpkgPlugin';
import { fetchPlugin } from '../../helpers/unpkgPlugins/plugins/fetchPlugin';

const CodeBlock: React.FC = (props) => {
  const [input, setInput] = useState('');
  const esBuildRef = useRef<boolean>();
  const codeCellRef = useRef<any>();

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

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const data = event.target.value;
    setInput(data);
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

    codeCellRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
  }

  const html = `
    <html>
      <head>
      </head>
      <body>
        <div id = 'root'> </div>
          <script> 
            window.addEventListener("message", (event) => {
                eval(event.data);
            },false)
          </script
      </body>
    </html>
  `

  return (
    <div>
      <BasicH1 content = 'Test your code' />
      <CodeInputTextArea value={input} onChange={handleInput}/>
      <SubmitButton onClick={handleButtonClick}/>
      <CodeCellDisplay ref={codeCellRef} srcDoc={html} sandbox={'allow-scripts'}/>
    </div>
  )
}

export default CodeBlock;