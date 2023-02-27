import './code-editor.css';
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount, EditorProps } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import FormatButton from '../../atoms/Buttons/FormatButton/FormatButton';
import editor from 'monaco-editor';

interface ICodeEditorProps extends EditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<ICodeEditorProps> = (props) => {
  const { initialValue, theme, language, height, options, onChange } = props;
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
  } 

  const formatCode = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    }).replace(/\n$/, '');
    
    editorRef.current.setValue(formatted);
  }

  const defaultOptions: editor.editor.IEditorConstructionOptions = {
    wordWrap: 'on',
    minimap: { enabled: false },
    folding: false,
    lineNumbersMinChars: 3,
    fontSize: 16,
    scrollBeyondLastLine: false,
    automaticLayout: true,
  }

  return (
    <div className = 'editor-wrapper'>   
      <FormatButton onClick={formatCode} />    
      <MonacoEditor 
        editorDidMount={onEditorDidMount}
        theme={theme || 'dark'} 
        value={initialValue} 
        language={language || 'javascript'} 
        height={height || '100%'}
        options={options || defaultOptions}
      />
    </div>
  );
}

export default CodeEditor;