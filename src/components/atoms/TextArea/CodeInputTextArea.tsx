interface ICodeInputTextAreaProps  {
  value?: any,
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void,
}

const CodeInputTextArea: React.FC<ICodeInputTextAreaProps> = (props) => {

  return (
    <div>
      <textarea value={props.value} onChange = {props.onChange}>

      </textarea>
    </div>
  )
}

export default CodeInputTextArea;