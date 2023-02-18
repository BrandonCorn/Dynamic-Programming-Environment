import React from 'react';

interface ICodeCellIFrame {
  sandbox?: string,
  src?: string,
  srcDoc?: string,
}

const CodeCellIframe: React.FC = (props: ICodeCellIFrame) => {

  return (
    <div> 
      <iframe 
        sandbox = {props.sandbox}  
        src = {props.src}
        srcDoc = {props.srcDoc}
      />
    </div>
  )
}

export default CodeCellIframe;