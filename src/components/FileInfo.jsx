import { useState } from "react";
import  Transcription  from "./Transcription.jsx";
import  Translation  from "./Translation.jsx";

export default function FileInfo() {
  const [tabCase, setTabCase] = useState("Transcription");
  return (
    <main
      className="
      flex-1 flex-col flex
      p-3 justify-center
      gap-3 justify-center mx-auto pb-20 max-s-prose w-full sm:gap-4 md:gap-5
      text-center
      pb-20"
    >
      <h1 className="font-semibold md:text-6xl text-4xl sm-text-5xl md:text-7xl">
        Your <span className="text-blue-400 bold">Transcription</span>
      </h1>
      <div className="flex mx-auto
       bg-white shadow rounded-full
       overflow-hidden items-center gap-2
       border-1 border-solid border-blue-400
        ">
        <button
        onClick={()=>setTabCase("Transcription")}
          className={
            "px-4 py-1 font-semibold duration-200 " +
            (tabCase === "Transcription"
              ? "bg-blue-400 text-white"
              : "text-blue-400 hover:text-blue-600 ")
          }
        >
          Transcription
        </button>
        <button
          onClick={()=>setTabCase("translation")}
          className={
            "px-4 py-1 font-semibold duration-200 " +
            (tabCase === "Transcription"
              ? "text-blue-400 hover:text-blue-600"
              : "bg-blue-400 text-white")
          }>
            Translation</button>
      </div>
      {tabCase === "translation" ? <Translation /> : <Transcription />}
    </main>
  );
}
