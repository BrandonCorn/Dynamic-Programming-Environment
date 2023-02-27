interface IGenericButtonProps{
  className?: string;
  content?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const GenericButton: React.FC<IGenericButtonProps> = ({className, content, onClick, children}) => {
  return (
    <button  className={className} onClick={onClick}>
      {children}
      {content || 'Submit'}
    </button>
  )
}

export default GenericButton;