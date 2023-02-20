import React from 'react';

interface IFormatButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const FormatButton: React.FC<IFormatButton> = (props) => {
  return (
    <button className='button button-format is-primary is-small' onClick={props.onClick}> 
      Format
    </button>
  );
}

export default FormatButton;