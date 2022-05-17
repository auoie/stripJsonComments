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
      const messageContribution = created.getContribution(
        "editor.contrib.messageController"
      );
      created.onDidAttemptReadOnlyEdit(() => {
        messageContribution?.dispose();
      });
      setResult(created);
    }
    return () => result?.dispose();
  }, [resultEl.current]);
  useEffect(() => {
    result?.setValue(stripJsonComments(text));
  }, [text]);
  return (
    <Div100vh className="flex flex-col">
      <div className="p-2 text-center">Remove JSON Comments</div>
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 w-1/2">
          <div className="text-center">JSON with Comments</div>
          <div className="flex flex-1 overflow-hidden" ref={monacoEl}></div>
        </div>
        <div className="flex flex-col flex-1 w-1/2 ">
          <div className="text-center">JSON</div>
          <div className="flex flex-1 overflow-hidden" ref={resultEl}></div>
        </div>
      </div>
      <div className="p-2 text-center">Made with Monaco</div>
    </Div100vh>
  );
};

export default App;
