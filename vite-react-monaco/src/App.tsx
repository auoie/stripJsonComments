import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import tsconfig from "./tsconfig";
import stripJsonComments from "strip-json-comments";
import Div100vh from "react-div-100vh";

const App: FC = () => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);
  const [text, setText] = useState(tsconfig);
  const [result, setResult] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const resultEl = useRef(null);
  useLayoutEffect(() => {
    if (monacoEl && !editor) {
      const created = monaco.editor.create(monacoEl.current!, {
        value: text,
        language: "json",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      });
      created.onDidChangeModelContent((_event) => {
        setText(created.getValue());
      });
      setEditor(created);
    }
    return () => editor?.dispose();
  }, [monacoEl.current]);
  useLayoutEffect(() => {
    if (resultEl && !result) {
      const created = monaco.editor.create(resultEl.current!, {
        value: stripJsonComments(text),
        language: "json",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        readOnly: true,
      });
      setResult(created);
    }
    return () => result?.dispose();
  }, [resultEl.current]);
  useEffect(() => {
    result?.setValue(stripJsonComments(text));
  }, [text]);
  return (
    <Div100vh className="flex flex-col min-h-0">
      <div>Remove JSON Comments</div>
      <div className="flex flex-1">
        <div className="flex flex-1 w-1/2" ref={monacoEl}></div>
        <div className="flex flex-1 w-1/2" ref={resultEl}></div>
      </div>
      <div>Made with Monaco</div>
    </Div100vh>
  );
};

export default App;
