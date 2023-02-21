import './code-preview.css';
import React, { useEffect, useRef } from 'react';

interface ICodePreview {
  code?: string,
}

const CodePreview:  React.FC<ICodePreview> = (props) => {
  const { code } = props;
  const ref = useRef<any>();
  const codeExecutionHtml = `
    <html>
      <head>
      </head>
      <body>
        <div id = 'root'> </div>
          <script> 
            const handleError = (err) => {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style = "color:red;" > <h4> Runtime Error </h4> <p>' +  err + ' </p> </div>'; 
              console.error(err);
            }

            window.addEventListener('error', (event) => {
              event.preventDefault();
              handleError(event.error);
            })

            window.addEventListener("message", (event) => {
                try{
                  eval(event.data);
                }
                catch(err){
                  handleError(err);
                }
            },false)
          </script
      </body>
    </html>
  `;

  useEffect(() => {
    ref.current.srcdoc = codeExecutionHtml;
  }, [code]); 

  const loadHandler = () => {
    ref.current.contentWindow.postMessage(code, '*');
  }


  return (
    <div className = 'preview-wrapper'> 
      <iframe
        title = 'Code Preview'
        ref = {ref}
        sandbox = 'allow-scripts'  
        srcDoc = {codeExecutionHtml}
        onLoad={loadHandler}
      />
    </div>
  )
}

export default CodePreview;