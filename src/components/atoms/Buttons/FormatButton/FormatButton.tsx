interface IFormatButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const FormatButton: React.FC<IFormatButtonProps> = (props) => {
  return (
    <button className='button button-format is-primary is-small' onClick={props.onClick}> 
      Format
    </button>
  );
}

export default FormatButton;