import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor: React.FC = () => {
  const [input, setInput] = useState('# Header');
  const [editing, setEditing] = useState(true);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const handleInput = (
    value: string | undefined, 
    event: React.ChangeEvent<HTMLTextAreaElement> | undefined
    ) => {
    if (value) {
      setInput(value);
    }
  }
  
  const handleEditing = () => {
    setEditing(!editing);
  }

  const editOrPreview = () => {
    if (editing){
      return (
        <div>
          <MDEditor value={input} onChange={handleInput} />
        </div>
      )
    }
    else{
      return (
        <div onClick={handleEditing}>
          <MDEditor.Markdown source={input} />
        </div>
      )
    }
  }

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (editorRef.current && event.target && editorRef.current.contains(event.target as Node)){
        return;
      }
      else setEditing(false);
    }

    window.addEventListener('click', listener, {capture: true})

    return () => {
      window.removeEventListener('click', listener, {capture: true})
    }
  },[])

  return (
    <div ref={editorRef}>
      {editOrPreview()}
    </div>
  )
}

export default MarkdownEditor;