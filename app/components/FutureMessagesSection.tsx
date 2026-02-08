"use client";

import { useState } from "react";

type FutureMessage = {
  id: number;
  title: string;
  content: string;
  unlock_at: string;
};

export default function FutureMessagesSection({ messages }: { messages: FutureMessage[] }) {
  const [selectedMessage, setSelectedMessage] = useState<FutureMessage | null>(null);
  const now = new Date();

  // Sort by unlock_at date (closest to farthest)
  const sortedMessages = [...messages].sort((a, b) => {
    return new Date(a.unlock_at).getTime() - new Date(b.unlock_at).getTime();
  });

  const isUnlocked = (unlockDate: string) => {
    return new Date(unlockDate) <= now;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section id="future-messages" className="w-full h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-8 text-center">
          Mesaje pentru Viitor
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedMessages && sortedMessages.length > 0 ? (
            sortedMessages.map((message) => {
              const unlocked = isUnlocked(message.unlock_at);
              return (
                <div
                  key={message.id}
                  className="bg-pink-400/80 backdrop-blur rounded-lg p-6 shadow-lg hover:shadow-xl transition"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">{message.title}</h3>

                  {unlocked ? (
                    <button
                      onClick={() => setSelectedMessage(message)}
                      className="px-4 py-2 bg-white/30 text-white rounded-lg hover:bg-white/40 transition text-sm"
                    >
                      Deschide
                    </button>
                  ) : (
                    <div className="text-sm text-white">
                      <p className="mb-1">🔒 Blocat</p>
                      <p className="text-xs opacity-80">Deblocare: {formatDate(message.unlock_at)}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-white text-center col-span-full">Nu sunt mesaje disponibile.</p>
          )}
        </div>
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-pink-400/95 backdrop-blur rounded-lg p-8 max-w-2xl w-full shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{selectedMessage.title}</h3>

            <p className="text-white text-base sm:text-lg leading-relaxed mb-6">{selectedMessage.content}</p>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedMessage(null)}
                className="flex-1 px-4 py-3 bg-white/30 text-white rounded-lg hover:bg-white/40 transition"
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
