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
      <nav className="flex bg-gray-200">
        <div className="hover:bg-gray-400">
          <Link href={"/"} className="flex flex-1">
            <a className="flex px-2 py-1">Strip JSON Comments</a>
          </Link>
        </div>
        {/* <div className="px-2 py-1 hover:bg-gray-400 cursor-pointer">About</div> */}
      </nav>
      <div className="flex flex-row justify-center items-center">
        <div className="py-1 px-2 w-[45%] justify-center items-center flex">
          JSON with Comments
        </div>
        <div className="py-1 px-2 w-[10%] justify-center items-center flex">
          to
        </div>
        <div className="py-1 px-2 w-[45%] justify-center items-center flex">
          JSON
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <textarea
          className="font-mono flex overflow-auto flex-1 bg-gray-200 p-2"
          onInput={(event) => {
            const text = event.currentTarget.value;
            setInputText(text !== null ? text : "");
          }}
        ></textarea>
        <textarea
          className="font-mono flex overflow-auto flex-1 bg-gray-300 p-2"
          value={stripJsonComments(inputText)}
        ></textarea>
      </div>
    </Div100vh>
  );
};

export default Home;
