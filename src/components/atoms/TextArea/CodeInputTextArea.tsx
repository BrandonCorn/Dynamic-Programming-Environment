import React from 'react';

interface ICodeInputTextArea {
  value?: any,
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> 
}

const CodeInputTextArea: React.FC = (props: ICodeInputTextArea) => {

  return (
    <div>
      <textarea value={props.value} onChange = {props.onChange}>

      </textarea>
    </div>
  )
}

export default CodeInputTextArea;