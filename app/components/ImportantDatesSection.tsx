"use client";

import TimeCounter from "./TimeCounter";
import MonthlyAnniversaryCounter from "./MonthlyAnniversaryCounter";

type ImportantDate = {
  id: number;
  type: string;
  date: string;
  clasa: string;
};

export default function ImportantDatesSection({ dates }: { dates: ImportantDate[] }) {
  // Filter for "clasa1" (meeting) date
  const meetingDate = dates?.find((d) => d.clasa?.toLowerCase() === "clasa1");

  if (!meetingDate) {
    return (
      <section id="important-dates" className="w-full h-screen flex flex-col items-center justify-center px-4 py-16">
        <p className="text-white text-center">Nu s-a găsit data întâlnirii.</p>
      </section>
    );
  }

  return (
    <section id="important-dates" className="w-full h-screen flex flex-col items-center justify-center px-4 py-16 space-y-16 overflow-y-auto">
      <TimeCounter meetingDate={meetingDate.date} />

      <MonthlyAnniversaryCounter />
    </section>
  );
}
