interface ISubmitButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SubmitButton: React.FC<ISubmitButtonProps> = (props) => {
  return (
    <button onClick={props.onClick}> 
      Submit 
    </button>
  )
}

export default SubmitButton;