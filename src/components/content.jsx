import { useState, useEffect, useRef } from "react";

export default function Content({ setAudio, setFile ,setIsRecording}) {
  const [recordStatus, setRecordStatus] = useState("inactive");
  const [recordsParts, setRecordsParts] = useState([]);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const audType = "audio/webm";

  const startRecording = async () => {
    let audioStore;
    console.log("record started");
    
    try {
      const usersAud = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      audioStore = usersAud;
    } catch (error) {
      console.log(error.message);
      
    }
    
    setRecordStatus("recording");
    
    
    const handleAud = new MediaRecorder(audioStore, { type: audType });
    
    audioRef.current = handleAud;
    audioRef.current.start();
    
    
    let recordedChuncks = [];

    audioRef.current.ondataavailable = (eve) => {
      if (typeof eve.data === "undefined") return;
      if (eve.data.size === 0) return;
      recordedChuncks.push(eve.data);
    };
    setRecordsParts(recordedChuncks);

  };

  const stopRecording = async () => {
    setRecordStatus("inactive");
    console.log("record stopped");
    
    audioRef.current.stop();
    
    audioRef.current.onstop = () => {
      const audData = new Blob(recordsParts, { type: audType });
      setAudio(audData);
      setRecordsParts([]);
      setDuration(0);
    };
    

    
  };

  useEffect(() => {
    // checking status before starting the record
    if (recordStatus === "inactive") {return}
    const intervaler = setInterval(() => setDuration((now) => now + 1), 1000);
    // the cleanup function
    return () => clearInterval(intervaler)
  });

  return (
    <main
      className="
    flex-1 flex-col flex
      p-3 justify-center
      gap sm:gap-4 md:gap-5
      text-center
      pb-20"
    >
      <h1 className="font-semibold md:text-6xl text-5xl sm-text-6xl md:text-7xl">
        Free<span className="text-blue-400 bold">Scribe</span>
      </h1>
      <h2 className="font-medium">
        Record
        <span className="text-blue-400"> &rarr; </span>
        Transcribe
        <span className="text-blue-400"> &rarr; </span>
        Translate
      </h2>
      <button
        className="flex
        justify-between
        text-base gap-4
        items-center w-72
        max-w-full my-4 mx-auto
        madehomebtn px-4 py-3 rounded-full"
        onClick={recordStatus === "inactive" ? startRecording : stopRecording}
      >
        <p>{recordStatus === "inactive" ? "Record" : "Stop Recording"}</p>
        <div className='flex items-center gap-2'>
                    {duration !== 0 && (
                        <p className='text-sm text-rose-300'>{duration}s</p>
                    )}
                    <i className={"fa-solid duration-200 fa-microphone " + (recordStatus=== 'recording' ? ' text-rose-500' : "")}></i>
                </div>
      </button>
      <p className="text-base">
        or{" "}
        <label className="text-blue-400 hover:text-blue-600 duration-200 cursor-pointer">
          upload
          <input
            type="file"
            accept=".mp3,.wave"
            onChange={(eve) => {
              let fileName = eve.target.files[0];
              setFile(fileName);
            }}
            className="hidden"
          />
        </label>{" "}
        a mp3 file
      </p>
      <p className="italic text-slate-300">free now free forever</p>
      
    </main>
  );
}
