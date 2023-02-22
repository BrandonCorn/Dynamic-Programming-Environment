import './resizable.css';
import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps, ResizeCallbackData } from 'react-resizable';


type ResizeHandleAxis = 's' | 'w' | 'n' | 'e' | 'sw' | 'se' | 'nw' | 'ne';

interface IResizable {
  children?: React.ReactNode;
  direction: 'horizontal' | 'vertical' | 'both';
  width?: number;
  height?: number;
  resizeHandles?: Array<ResizeHandleAxis>;
}

const Resizable: React.FC<IResizable> = ({direction, width, height, resizeHandles, children}) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [mWidth, setMWidth] = useState(window.innerWidth * 0.75);

  const resizeHandler = (event: React.SyntheticEvent<Element, Event>, data: ResizeCallbackData) => {
    setMWidth(data.size.width);
  }

  const resizeProps: ResizableBoxProps = direction === 'horizontal' ? {
    className: 'resize-horizontal',
    axis: 'x', width: innerWidth * 0.75, height: Infinity,
    minConstraints: [innerWidth * 0.2, Infinity], maxConstraints: [innerWidth * 0.75, Infinity],
    resizeHandles: ['e'],
    onResizeStop: resizeHandler,
  } : {
    axis: 'y', width: Infinity, height: 300, minConstraints: [Infinity, 50], 
    maxConstraints: [Infinity, innerHeight * 0.9],
    resizeHandles: ['s'],
    onResizeStop: resizeHandler,
  }



  useEffect(() => {
    let timer: any;
    const listener = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
      if (window.innerWidth * 0.75 < mWidth){
        setMWidth(window.innerWidth * 0.75);
      }
      }, 100);
    }
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    }
  },[mWidth])

  return(
      <ResizableBox 
        children={children} 
        width={width || resizeProps.width} 
        height={height || resizeProps.height}
        resizeHandles= {resizeHandles || resizeProps.resizeHandles}
        {...resizeProps} 
      />
  )
}

export default Resizable;