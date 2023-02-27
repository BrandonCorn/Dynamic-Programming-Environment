interface IBasicH1Props {
  content: string
}

const BasicH1: React.FC<IBasicH1Props> = (props) => {
  return (
    <h1> {props.content} </h1>
  )
}

export default BasicH1;