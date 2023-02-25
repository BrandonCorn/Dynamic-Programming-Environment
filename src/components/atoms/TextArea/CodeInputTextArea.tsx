interface ICodeInputTextArea  {
  value?: any,
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void,
}

const CodeInputTextArea: React.FC<ICodeInputTextArea> = (props) => {

  return (
    <div>
      <textarea value={props.value} onChange = {props.onChange}>

      </textarea>
    </div>
  )
}

export default CodeInputTextArea;