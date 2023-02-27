interface ISmallUpButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SmallUpButton: React.FC<ISmallUpButtonProps> = ({ onClick }) => {
  return (
    <button className='button is-primary is-small' onClick={onClick}> 
      <span className='icon'>
        <i className = 'fas fa-arrow-up' />
      </span>
    </button>
  )
}

export default SmallUpButton;