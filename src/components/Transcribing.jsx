import React from "react";

export default function Transcribing({ downloading }) {
  return (
    <div className="flex flex-col gap-10 md:gap-14 py-14 text-center flex-1 items-center justify-center">
      <div className="flex flex-col gap-2 sm:gap-4">
        <h1 className="font-semibold md:text-6xl text-5xl sm-text-6xl md:text-7xl">
          <span className="text-blue-400 bold">Transcribing</span>
        </h1>
        <p>
          {!downloading ? "warming up cylinders" : "core cylinders engaged"}
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:gap-4 mx-auto w-full max-w-[500px]">
        {[0, 1, 2].map((value) => {
          return (
            <div
              key={value}
              className={
                "rounded-full h-2 sm:h-3 bg-slate-400 loading " +
                `loading-${value}`
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
}
