import Editor, { useMonaco } from "@monaco-editor/react";
import clsx from "clsx";
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
  }, [monaco]);
  useEffect(() => {
    const element = document.documentElement;
    setDarkMode(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
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
  const strippedJson = stripJsonComments(text);
  return (
    <div>
      <div
        className={clsx(
          "flex items-center w-full py-2 z-50 ring-1",
          "ring-black ring-opacity-5",
          "dark:ring-white dark:ring-opacity-10"
        )}
      >
        <div className="w-5/12 text-center">JSON with Comments</div>
        <div className="w-2/12 text-xl font-light text-center">➞</div>
        <div className="flex items-center justify-center w-5/12 text-center">
          <div>JSON without Comments</div>
          <div className="ml-2 text-center">
            <button
              className={clsx(
                "p-2 leading-tight transition ring-1 rounded ring-opacity-10",
                "bg-white ring-black ",
                "dark:bg-black dark:ring-white dark:ring-opacity-10",
                "hover:dark:bg-neutral-800",
                "hover:bg-neutral-200"
              )}
            >
              Copy to clipboard
            </button>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "flex ring-1",
          "ring-black ring-opacity-5",
          "dark:ring-white dark:ring-opacity-5"
        )}
      >
        <Editor
          height={"80vh"}
          width={"50%"}
          defaultLanguage="json"
          value={text}
          options={{
            minimap: {
              enabled: false,
            },
            lineNumbers: "off",
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
          value={strippedJson}
          options={{
            minimap: {
              enabled: false,
            },
            lineNumbers: "off",
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
