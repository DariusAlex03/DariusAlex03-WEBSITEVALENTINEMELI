"use client";

import { useEffect, useState } from "react";

interface TimeToAnniversary {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function MonthlyAnniversaryCounter() {
  const [timeToAnniversary, setTimeToAnniversary] = useState<TimeToAnniversary>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeToAnniversary = () => {
      const now = new Date();
      let nextAnniversary = new Date(now.getFullYear(), now.getMonth(), 26);

      // If we've already passed the 26th this month, calculate for next month
      if (now.getDate() >= 26) {
        nextAnniversary = new Date(now.getFullYear(), now.getMonth() + 1, 26);
      }

      const diff = nextAnniversary.getTime() - now.getTime();

      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeToAnniversary({ days, hours, minutes, seconds });
    };

    calculateTimeToAnniversary();
    const interval = setInterval(calculateTimeToAnniversary, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg mb-4">
        Până la următoarea aniversare lunară mai sunt :
      </h2>

      <div className="bg-pink-400/80 backdrop-blur rounded-lg p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <div className="bg-white/20 rounded-lg p-2 sm:p-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">{timeToAnniversary.days}</div>
            <div className="text-xs text-white mt-0.5">Zile</div>
          </div>

          <div className="bg-white/20 rounded-lg p-2 sm:p-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">{timeToAnniversary.hours}</div>
            <div className="text-xs text-white mt-0.5">Ore</div>
          </div>

          <div className="bg-white/20 rounded-lg p-2 sm:p-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">{timeToAnniversary.minutes}</div>
            <div className="text-xs text-white mt-0.5">Minute</div>
          </div>

          <div className="bg-white/20 rounded-lg p-2 sm:p-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">{timeToAnniversary.seconds}</div>
            <div className="text-xs text-white mt-0.5">Secunde</div>
          </div>
        </div>
      </div>
    </div>
  );
}
