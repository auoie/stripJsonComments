import type { NextPage } from "next";
import Div100vh from "react-div-100vh";

import Head from "next/head";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import stripJsonComments from "strip-json-comments";
import Link from "next/link";

const Home: NextPage = () => {
  const [inputText, setInputText] = useState("");
  return (
    <Div100vh className="flex flex-col">
      <Head>
        <title>Remove JSON Comments</title>
      </Head>
      <nav className="flex">
        <Link href={"/"}>
          <a className="hover:bg-zinc-700">Strip JSON Comments</a>
        </Link>
      </nav>
      <div className="flex flex-row justify-center items-center">
        <div className="w-[45%] justify-center items-center flex">
          JSON with Comments
        </div>
        <div className="w-[10%] justify-center items-center flex">to</div>
        <div className="w-[45%] justify-center items-center flex">JSON</div>
      </div>
      <div className="flex flex-1 min-h-0">
        <textarea
          className="flex overflow-auto flex-1 bg-gray-700 p-2"
          onInput={(event) => {
            const text = event.currentTarget.value;
            setInputText(text !== null ? text : "");
          }}
        ></textarea>
        <textarea
          className="flex overflow-auto flex-1 bg-gray-800 p-2"
          value={stripJsonComments(inputText)}
        ></textarea>
      </div>
    </Div100vh>
  );
};

export default Home;
