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
  `;

  useEffect(() => {
    ref.current.srcdoc = codeExecutionHtml;
    ref.current.contentWindow.postMessage(code, '*');
  }, [code]); 


  return (
    <div> 
      <iframe 
        title = 'Code Preview'
        ref = {ref}
        sandbox = 'allow-scripts'  
        srcDoc = {codeExecutionHtml}
      />
    </div>
  )
}

export default CodePreview;