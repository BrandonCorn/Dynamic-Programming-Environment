import MonacoEditor, { EditorDidMount, EditorProps } from '@monaco-editor/react';

interface ICodeEditor extends EditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<ICodeEditor> = (props) => {
  const { initialValue, theme, language, height, options, onChange } = props;

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
  } 

  return (
    <div>         
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