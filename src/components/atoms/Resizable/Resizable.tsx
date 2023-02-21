import './resizable.css';
import React from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';


type ResizeHandleAxis = 's' | 'w' | 'n' | 'e' | 'sw' | 'se' | 'nw' | 'ne';

interface IResizable {
  children?: React.ReactNode;
  direction: 'horizontal' | 'vertical';
  width?: number;
  height?: number;
  resizeHandles?: Array<ResizeHandleAxis>;
}

const Resizable: React.FC<IResizable> = ({direction, width, height, resizeHandles, children}) => {

  const resizeProps: ResizableBoxProps = direction === 'horizontal' ? {
    className: 'resize-horizontal',
    axis: 'x', width: window.innerWidth * 0.75, height: Infinity,
    minConstraints: [window.innerWidth * 0.2, Infinity], maxConstraints: [window.innerWidth * 0.75, Infinity],
    resizeHandles: ['e'],
  } : {
    axis: 'y', width: Infinity, height: 300, minConstraints: [Infinity, 50], 
    maxConstraints: [Infinity, window.innerHeight * 0.9],
    resizeHandles: ['s'],
  }

  return(
      <ResizableBox 
        children={children} 
        width={width || resizeProps.width ||  50} 
        height={height || resizeProps.height || 50}
        resizeHandles= {resizeHandles || resizeProps.resizeHandles}
        {...resizeProps} 
      />
  )
}

export default Resizable;