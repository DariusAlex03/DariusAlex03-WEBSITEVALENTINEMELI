"use client";

import { useEffect, useState } from "react";

interface TimeDifference {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function TimeCounter({ meetingDate }: { meetingDate: string }) {
  const [timeDiff, setTimeDiff] = useState<TimeDifference>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeDiff = () => {
      const startDate = new Date(meetingDate);
      const now = new Date();

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      // Adjust for negative values
      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        days += 30; // Simplified; actual days in month vary
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeDiff({ years, months, days, hours, minutes, seconds });
    };

    calculateTimeDiff();
    const interval = setInterval(calculateTimeDiff, 1000);

    return () => clearInterval(interval);
  }, [meetingDate]);

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg mb-4">
        De cât timp suntem împreună ❤️: 
      </h2>

      <div className="bg-pink-400/80 backdrop-blur rounded-lg p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-white/20 rounded-lg p-2 sm:p-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">{timeDiff.years}</div>
            <div className="text-xs text-white mt-0.5">Ani</div>
          </div>

          <div className="bg-white/20 rounded-lg p-2 sm:p-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">{timeDiff.months}</div>
            <div className="text-xs text-white mt-0.5">Luni</div>
          </div>

          <div className="bg-white/20 rounded-lg p-2 sm:p-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">{timeDiff.days}</div>
            <div className="text-xs text-white mt-0.5">Zile</div>
          </div>

          <div className="bg-white/20 rounded-lg p-2 sm:p-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">{timeDiff.hours}</div>
            <div className="text-xs text-white mt-0.5">Ore</div>
          </div>

          <div className="bg-white/20 rounded-lg p-2 sm:p-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">{timeDiff.minutes}</div>
            <div className="text-xs text-white mt-0.5">Minute</div>
          </div>

          <div className="bg-white/20 rounded-lg p-2 sm:p-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">{timeDiff.seconds}</div>
            <div className="text-xs text-white mt-0.5">Secunde</div>
          </div>
        </div>
      </div>
    </div>
  );
}
