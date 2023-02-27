interface ISmallDownButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SmallDownButton: React.FC<ISmallDownButtonProps> = ({ onClick }) => {
  return (
    <button className='button is-primary is-small' onClick={onClick}> 
      <span className='icon'>
        <i className = 'fas fa-arrow-down' />
      </span>
    </button>
  )
}

export default SmallDownButton;