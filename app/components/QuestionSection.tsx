"use client";

import { useState } from "react";

export default function QuestionSection() {
  const [noCount, setNoCount] = useState(0);
  const [answered, setAnswered] = useState(false);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setAnswered(true);
  };

  if (answered) {
    return (
      <div className="flex flex-col items-center gap-6 mt-8 w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl text-center">
        <div className="bg-pink-400/80 backdrop-blur rounded-lg p-8 sm:p-10 md:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
            Te iubesc dragostea mea ❤️! Sunt atât de fericit că ești a mea și că putem sărbători această zi împreună. Ești lumina vieții mele și nu pot să-mi imaginez o zi fără tine. La mulți ani de Valentine's Day, iubirea mea! Te ador din tot sufletul! ❤️
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 mt-8 w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl text-center">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
        Would you like to be my Valentine?
      </h1>

      <div className="flex gap-4 mt-4">
        <button
          type="button"
          onClick={handleYesClick}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          style={{
            transform: `scale(${1 + noCount * 0.5})`,
            transition: "transform 0.3s ease",
          }}
        >
          YES
        </button>

        {noCount < 5 && (
          <button
            type="button"
            onClick={handleNoClick}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            NO
          </button>
        )}
      </div>
    </div>
  );
}
