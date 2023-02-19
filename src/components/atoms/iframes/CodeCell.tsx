import React from 'react';

type IframeProps = React.HTMLProps<HTMLIFrameElement>;

interface ICodeCellIframe {
  ref?: React.MutableRefObject<HTMLIFrameElement | null>
  sandbox?: string,
  src?: string,
  srcDoc?: string,
}

const CodeCellIframe = React.forwardRef<HTMLIFrameElement, ICodeCellIframe>((props: ICodeCellIframe, ref) => {

  return (
    <div> 
      <iframe 
        ref = {ref}
        sandbox = {props.sandbox}  
        src = {props.src}
        srcDoc = {props.srcDoc}
      />
    </div>
  )
});

export default CodeCellIframe;