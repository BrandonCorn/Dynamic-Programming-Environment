interface ISmallDeleteButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SmallDeleteButton: React.FC<ISmallDeleteButtonProps> = ({ onClick }) => {
  return (
    <button className='button is-primary is-small' onClick={onClick}> 
      <span className='icon'>
        <i className = 'fas fa-times' />
      </span>
    </button>
  )
}

export default SmallDeleteButton;