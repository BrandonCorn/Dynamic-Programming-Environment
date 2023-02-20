import './resizable.css';
import React from 'react';
import { ResizableBox } from 'react-resizable';


type ResizeHandleAxis = 's' | 'w' | 'n' | 'e' | 'sw' | 'se' | 'nw' | 'ne';

interface IResizable {
  children?: React.ReactNode;
  direction: 'horizontal' | 'vertical';
  width?: number;
  height?: number;
  resizeHandles?: Array<ResizeHandleAxis>;
}

const Resizable: React.FC<IResizable> = ({direction, width, height, resizeHandles, children}) => {
  const axis = direction === 'horizontal' ? 'x' : 'y';

  return(
    <div>
      <ResizableBox 
        children={children} 
        width={Infinity} 
        height={height || 500} 
        axis={axis || 'both'}
        minConstraints={[Infinity, 50]}
        maxConstraints={[Infinity,window.innerHeight * 0.9]}
        resizeHandles={resizeHandles || ['s']} ></ResizableBox>
    </div>
  )
}

export default Resizable;