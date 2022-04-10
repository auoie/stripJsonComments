import Editor from "@monaco-editor/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import stripJsonComments from "strip-json-comments";
import { ThemeToggle } from "../components/ThemeToggle";

const SideBySide = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [text, setText] = useState("");
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
      {darkMode === null ? "null" : darkMode === true ? "true" : "false"}
      <div className="flex">
        <Editor
          height="80vh"
          width={"50%"}
          defaultLanguage="text"
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

const Home: NextPage = () => {
  return (
    <div>
      <div className="text-3xl font-bold underline">Hi</div>
      <ThemeToggle />
      <SideBySide />
    </div>
  );
};

export default Home;
