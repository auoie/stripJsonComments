import type { NextPage } from "next";
import Div100vh from "react-div-100vh";

import Head from "next/head";
import { useState } from "react";
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
        {/* <div className="px-2 py-1 cursor-pointer hover:bg-gray-400">About</div> */}
      </nav>
      <div className="flex flex-row items-center justify-center">
        <div className="py-1 px-2 w-[45%] justify-center text-center items-center flex leading-5">
          JSON with Comments
        </div>
        <div className="py-1 px-2 w-[10%] justify-center text-center items-center flex leading-5">
          to
        </div>
        <div className="py-1 px-2 w-[45%] justify-center text-center items-center flex leading-5">
          JSON
        </div>
      </div>
      <div className="flex flex-1">
        <textarea
          className="flex flex-1 p-2 overflow-auto font-mono bg-gray-200"
          onInput={(event) => {
            const text = event.currentTarget.value;
            setInputText(text !== null ? text : "");
          }}
        ></textarea>
        <textarea
          className="flex flex-1 p-2 overflow-auto font-mono bg-gray-300"
          value={stripJsonComments(inputText)}
          readOnly
        ></textarea>
      </div>
      <div>Made with Monaco</div>
    </Div100vh>
  );
};

export default Home;
