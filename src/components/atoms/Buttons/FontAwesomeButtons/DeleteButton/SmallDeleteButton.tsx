interface ISmallDeleteButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SmallDeleteButton: React.FC<ISmallDeleteButton> = ({ onClick }) => {
  return (
    <button className='button is-primary is-small' onClick={onClick}> 
      <span className='icon'>
        <i className = 'fas fa-times' />
      </span>
    </button>
  )
}

export default SmallDeleteButton;