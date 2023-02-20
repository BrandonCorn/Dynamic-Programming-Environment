import { useRef } from 'react';
import MonacoEditor, { EditorDidMount, EditorProps } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface ICodeEditor extends EditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<ICodeEditor> = (props) => {
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
    });
    
    editorRef.current.setValue(formatted);
  }

  return (
    <div>   
      <button onClick={formatCode}> Format </button>      
      <MonacoEditor 
        editorDidMount={onEditorDidMount}
        theme={theme || 'dark'} 
        value={initialValue} 
        language={language} 
        height={height}
        options={options}
      />
    </div>
  );
}

export default CodeEditor;