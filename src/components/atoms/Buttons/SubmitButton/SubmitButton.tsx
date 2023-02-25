interface ISubmitButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SubmitButton: React.FC<ISubmitButton> = (props) => {
  return (
    <button onClick={props.onClick}> 
      Submit 
    </button>
  )
}

export default SubmitButton;