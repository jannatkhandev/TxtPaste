'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const AceEditor = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-text');
    await import('ace-builds/src-noconflict/mode-javascript');
    await import('ace-builds/src-noconflict/mode-python');
    await import('ace-builds/src-noconflict/mode-html');
    await import('ace-builds/src-noconflict/mode-css');
    await import('ace-builds/src-noconflict/mode-java');
    await import('ace-builds/src-noconflict/mode-csharp');
    await import('ace-builds/src-noconflict/mode-typescript');
    await import('ace-builds/src-noconflict/mode-php');
    await import('ace-builds/src-noconflict/mode-ruby');
    await import('ace-builds/src-noconflict/mode-golang');
    await import('ace-builds/src-noconflict/mode-sql');
    await import('ace-builds/src-noconflict/mode-markdown');
    await import('ace-builds/src-noconflict/theme-github');
    await import('ace-builds/src-noconflict/theme-monokai');
    return ace;
  },
  { ssr: false }
);

interface AceEditorWrapperProps {
  content: string;
  syntax: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  showGutter?: boolean;
  height?: string;
  width?: string;
  fontSize?: number;
  enableBasicAutocompletion?: boolean;
  enableLiveAutocompletion?: boolean;
  enableSnippets?: boolean;
}

const AceEditorWrapper: React.FC<AceEditorWrapperProps> = ({
  content,
  syntax,
  onChange,
  readOnly = false,
  showGutter = true,
  height = '400px',
  width = '100%',
  fontSize = 14,
  enableBasicAutocompletion = true,
  enableLiveAutocompletion = false,
  enableSnippets = false,
}) => {
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'monokai' : 'github';

  return (
    <AceEditor
      mode={syntax}
      theme={editorTheme}
      name="ace-editor"
      value={content}
      onChange={onChange}
      readOnly={readOnly}
      showGutter={showGutter}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion,
        enableLiveAutocompletion,
        enableSnippets,
        showLineNumbers: true,
        tabSize: 2,
        fontSize,
      }}
      style={{ width, height }}
    />
  );
};

export default AceEditorWrapper;