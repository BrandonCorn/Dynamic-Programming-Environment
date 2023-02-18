import React from 'react';
import CodeInputTextArea from '../atoms/TextArea/CodeInputTextArea';
import CodeCellDisplay from '../atoms/iframes/CodeCell';

const CodeBlock: React.FC = (props) => {
  return (
    <div> 
      <CodeInputTextArea />
      <CodeCellDisplay />
    </div>
  )
}

export default CodeBlock;