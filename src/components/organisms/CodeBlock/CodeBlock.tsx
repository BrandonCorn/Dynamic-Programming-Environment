import React, { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import CodeEditor from '../../molecules/CodeEditor/CodeEditor';
import CodeCellDisplay from '../../atoms/IFrames/CodeCell/CodeCell';
import SubmitButton from '../../atoms/Buttons/SubmitButton/SubmitButton';
import { unpkgPathPlugin } from '../../../helpers/unpkgPlugins/plugins/unpkgPlugin';
import { fetchPlugin } from '../../../helpers/unpkgPlugins/plugins/fetchPlugin';

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

  const handleInput = (value:string) => {
    setInput(value);
  }

  const handleButtonClick = async () => {
    if (!esBuildRef.current) return;

    codeCellRef.current.srcdoc = codeExecutionHtml;

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

  const codeExecutionHtml = `
    <html>
      <head>
      </head>
      <body>
        <div id = 'root'> </div>
          <script> 
            window.addEventListener("message", (event) => {
                try{
                  eval(event.data);
                }
                catch(err){
                  const root = document.querySelector('#root');
                  root.innerHTML = '<div style = "color:red;" > <h4> Runtime Error </h4> <p>' +  err + ' </p> </div>'; 
                }
            },false)
          </script
      </body>
    </html>
  `

  return (
    <div>
      <CodeEditor 
        initialValue ={'const a = 1;'} 
        onChange={handleInput}
        language = {'javascript'} 
        height={'300px'} 
        options={{
          wordWrap: 'on',
          minimap: { enabled: false},
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        /> 
      <SubmitButton onClick={handleButtonClick}/>
      <CodeCellDisplay ref={codeCellRef} srcDoc={codeExecutionHtml} sandbox={'allow-scripts'}/>
    </div>
  )
}

export default CodeBlock;