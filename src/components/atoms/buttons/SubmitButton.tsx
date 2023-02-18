import React from 'react';

interface ISubmitButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const SubmitButton: React.FC = (props: ISubmitButton) => {
  return (
    <button onClick={props.onClick} > Submit </button>
  )
}

export default SubmitButton;