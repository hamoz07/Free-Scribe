//! used fonts:
//* open sans
//* poppins

import Content from "./components/content";
import Header from "./components/header";
import DisplayData from "./components/DisplayData.jsx";
import Footer from "./components/Footer.jsx";
import FileInfo from "./components/FileInfo";
import Transcribing from "./components/Transcribing";

import { useState, useRef, useEffect } from "react";
import { MessageTypes } from "./utils/presets";

function App() {
  const [file, setFile] = useState(null);
  const [audioHolder, setAudio] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const dataInsertedCheck = file || audioHolder;

  const resetHandler = () => {
    setFile(null);
    setAudio(null);
  };

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./utils/whisper.worker.js", import.meta.url),
        { type: "module" }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case "DOWNLOADING":
          setDownloading(true);
          console.log("DOWNLOADING...");
          break;
        case "LOADING":
          setLoading(true);
          console.log("LOADING...");
          break;
        case "RESULT":
          setOutput(e.data.results);
          console.log(e.data.results);
          break;
        case "INFERENCE_DONE":
          setFinished(true);
          console.log("DONE!...");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const readAudioFrom = async (file) => {
    const sampleRate = 16000;
    const audioContext = new AudioContext({ sampleRate });
    const response = await file.arrayBuffer();
    const decoded = await audioContext.decodeAudioData(response);
    const audio = decoded.getChannelData(0);
    return audio;
  };

  const handleFormSubmission = async () => {
    if(!file && !audioHolder) return;
    let audio = await readAudioFrom(file ? file : audioHolder)
    const model_name = `openai/whisper-tiny.en`

    worker.current.postMessage({
      type:MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name
    })

  }


  return (
    <div className="flex flex-col  max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen p-3 flex flex-col">
        <Header />
        {output ? (
          <FileInfo output={output} finished={finished} />
        ) : loading ? (
          <Transcribing />
        ) : dataInsertedCheck ? (
          <DisplayData handleFormSubmission={handleFormSubmission}  file={file} audio={audioHolder} reset={resetHandler} />
        ) : (
          <Content setAudio={setAudio} setFile={setFile} />
        )}
      </section>

      <Footer />
    </div>
  );
}

export default App;
