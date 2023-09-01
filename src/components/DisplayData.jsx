export default function DisplayData({
  file,
  audioHolder,
  reset,
  handleFormSubmission,
}) {
  return (
    <main
      className="
      flex-1 flex-col flex
      p-3 justify-center
      gap sm:gap-4 md:gap-5
      text-center
      pb-20 w-fit max-w-full mx-auto
      "
    >
      <h1 className="font-semibold text-4xl sm-text-5xl md:text-6xl">
        Your <span className="text-blue-400 bold">File</span>
      </h1>
      <div className="flex flex-col text-left my-2">
        <h3 className="font-semibold">Name</h3>
        <p>{file ? file.name : "custom audio"}</p>
      </div>
      <div className="flex justify-between items-center gap-20">
        <button
          className="text-slate-400 hover:text-blue-400 duration-400"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="madehomebtn rounded-lg text-blue-500 px-3 py-2 font-medium"
          onClick={handleFormSubmission}
        >
          Transcribe
          <i className="fa-solid fa-pen-fancy ml-1"></i>
        </button>
      </div>
    </main>
  );
}
