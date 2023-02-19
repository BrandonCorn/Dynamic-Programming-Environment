import React from 'react';

interface IBasicH1 {
  content: string
}

const BasicH1: React.FC<IBasicH1> = (props) => {
  return (
    <h1> {props.content} </h1>
  )
}

export default BasicH1;