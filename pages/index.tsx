import Editor, { useMonaco } from "@monaco-editor/react";
import type { NextPage } from "next";
import { FC, useEffect, useState } from "react";
import stripJsonComments from "strip-json-comments";
import { ThemeToggle } from "../components/ThemeToggle";

const SideBySide = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [text, setText] = useState("");
  const monaco = useMonaco();
  useEffect(() => {
    // do conditional chaining
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: true,
    });
    // or make sure that it exists by other ways
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);
  useEffect(() => {
    const element = document.documentElement;
    setDarkMode(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      console.log(document.documentElement.classList.contains("dark"));
      setDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(element, {
      attributes: true,
      attributeFilter: ["class"],
      childList: false,
      characterData: false,
    });
  }, []);
  const theme = darkMode ? "vs-dark" : "vs";
  console.log("render");
  return (
    <div>
      <div className="flex">
        <Editor
          height="80vh"
          width={"50%"}
          defaultLanguage="json"
          value={text}
          options={{
            minimap: {
              enabled: false,
            },
          }}
          onChange={(event) => {
            if (event) {
              setText(event);
            }
          }}
          theme={theme}
        />
        <Editor
          height="80vh"
          width={"50%"}
          defaultLanguage="json"
          value={stripJsonComments(text)}
          options={{
            minimap: {
              enabled: false,
            },
            readOnly: true,
          }}
          theme={theme}
        />
      </div>
    </div>
  );
};
const Header: FC = () => {
  return (
    <div className="container flex items-center justify-between py-5 mx-auto">
      <div className="text-3xl font-bold">JSON Comment Remover</div>
      <ThemeToggle />
    </div>
  );
};
const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <SideBySide />
    </div>
  );
};

export default Home;
