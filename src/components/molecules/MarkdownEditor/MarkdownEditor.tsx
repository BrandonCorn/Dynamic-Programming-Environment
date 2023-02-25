import './markdown-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useAction } from '../../../hooks/useAction';
import { ICell } from '../../../state';

interface IMarkdownEditor {
  cell: ICell
}


const MarkdownEditor: React.FC<IMarkdownEditor> = ({ cell }) => {
  const { id, content } = cell;
  const { updateCell } = useAction();
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const handleInput = (
    value: string | undefined, 
    event: React.ChangeEvent<HTMLTextAreaElement> | undefined
    ) => {
      updateCell(id, value || '');
  }
  
  const handleEditing = () => {
    setEditing(!editing);
  }

  const editOrPreview = () => {
    if (editing){
      return (
        <div className='markdown-editor card-content'>
          <MDEditor value={content} onChange={handleInput} />
        </div>
      )
    }
    else{
      return (
        <div className='markdown-editor card-content' onClick={handleEditing}>
          <MDEditor.Markdown source={content || 'Click to Edit'} />
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
    <div className='card'  ref={editorRef}>
      {editOrPreview()}
    </div>
  )
}

export default MarkdownEditor;