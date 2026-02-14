"use client";

import { useState, useEffect, useRef } from "react";

const sweetMessages = [
  "Te iubesc mai mult în fiecare zi ❤️",
  "Zâmbetul tău îmi face ziua mai frumoasă 💕",
  "Dormi bine, iubirea mea 😴",
  "Tu ești visul meu adevărat ✨",
  "Fiecare moment cu tine este special 💝",
  "Ești frumoasă chiar și fără makeup 👑",
  "Te gândesc și zâmbesc 😊",
  "Mulțumesc că exiști 🙏",
  "Tu ești rațiunea pentru care sunt fericit 😍",
  "Dragostea mea pentru tine crește în fiecare zi 📈",
  "Ești perfectă exact cum ești 💎",
  "Yesss! Te ador cu toată inima ❤️",
  "Ești lumina mea în întuneric ✨",
  "Cu tine, totul are sens 💫",
  "Sunt norocos că te am 🍀",
  "Ți-aș da toate stelele din cer 🌟",
  "Iți doresc o zi plin de zâmbete și soarele să fie la picioarele tale ☀️",
  "Când te văd, inima mea bate mai repede 💓",
  "Ești gândul meu prim de dimineață și ultimul seara 🌙",
  "Ești cea mai dulce persoană pe care am cunoscut-o 🍫",
  "Tu ești răspunsul la rugăciunile mele 🙏",
  "Iți mulțumesc pentru fiecare secundă pe care o petreci cu mine ⏰",
  "Te ador, azi, mâine și pentru totdeauna 💕",
  "Ești visul din care nu vreau niciodată să mă trezesc 😴",
  "Tu ești rețeta fericirii mele 🧁",
  "Sunt fericit că te-am găsit pe tine 😊",
  "Ești frumoasă chiar și cu părul pe față 😄",
  "Ești infinitul meu ∞",
  "Ești cea cu care vreau să trăiesc tot ce este frumos 🌺",
  "Te gândesc și zâmbesc mereu 😁",
  "Iți dau inima mea, ea e a ta 💖",
  "Ești motivul pentru care visez frumos 🌙",
  "Te iubesc și mă mâncă nerabdarea să te văd 👀",
  "Fiecare zâmbet al tău îmi face ziua mai bună ✨",
  "Iți iubesc fiecare detaliu, chiar și greșelile 💚",
  "Te iubesc și nu mai vreau să mă gândesc la altceva 💭",
  "Iți mulțumesc că m-ai învățat să iubesc ❤️",
  "Te iubesc mai mult decât cuvintele pot spune 🤐",
  "Fiecare clipă cu tine e o binecuvântare 🙌",
  "Ești lumina care mă ghidează 💡",
  "Test sa vad daca ai ajuns pana aici si daca le citesti toate.😁",
  "Te ador și asta e clar 📢",
  "Iți dau toate promisiunile mele 💯",
  "Mai ales promit ca te iubesc, si ca vei deveni sotia mea 💍",
  "Tu ești focul care mă încălzește 🔥",
  "Ești visul meu cel mai frumos 😍",
  "Ești fata pe care am așteptat-o mereu 🎁",
  "Fiecare cuvânt pe care ți-l spun, îl simt 💬",
  "Ești cea care mă inspiră să fiu mai bun 🚀",
  "Ești singurul lucru de care am nevoie 🧲",
  "Tu ești cea mai frumoasă întâmplare din viața mea 🎪",
  "Te iubesc și voi continua să te iubesc 🕰️",
  "Ești cristalul care reflectă lumina mea 💎",
  "Ești motivul pentru care cred în iubire 💕",
  "Ai ajuns pana la capat, te iubesc si te ador din tot sufletul meu ❤️",
  "Momentan asta e capatul, mesaje noi vor mai fii adaugate in viitor 😉",
];

export default function SweetMessagesSection() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [randomChecked, setRandomChecked] = useState(false);
  const [randomMode, setRandomMode] = useState(false);
  const intervalRef = useRef<number | null>(null);


  const handleNext = () => {
    if (randomMode) {
      let next = Math.floor(Math.random() * sweetMessages.length);
      if (next === currentMessage) next = (next + 1) % sweetMessages.length;
      setCurrentMessage(next);
      return;
    }
    setCurrentMessage((prev) => (prev + 1) % sweetMessages.length);
  };

  const handlePrev = () => {
    if (randomMode) {
      let prev = Math.floor(Math.random() * sweetMessages.length);
      if (prev === currentMessage) prev = (prev + 1) % sweetMessages.length;
      setCurrentMessage(prev);
      return;
    }
    setCurrentMessage((prev) => (prev - 1 + sweetMessages.length) % sweetMessages.length);
  };

  const applyRandom = () => {
    // toggle applied random mode
    if (!randomMode) {
      // enable random autoplay every 6 seconds
      setRandomMode(true);
      setRandomChecked(true);
      const idx = Math.floor(Math.random() * sweetMessages.length);
      setCurrentMessage(idx);
    } else {
      // disable
      setRandomMode(false);
      setRandomChecked(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  // autoplay when randomMode is enabled (fixed 6s)
  useEffect(() => {
    if (randomMode) {
      intervalRef.current = window.setInterval(() => {
        setCurrentMessage((prev) => {
          let next = Math.floor(Math.random() * sweetMessages.length);
          if (next === prev) next = (next + 1) % sweetMessages.length;
          return next;
        });
      }, 6000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [randomMode]);

  return (
    <section id="sweet-messages" className="w-full h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-12">
          Mesaje Dulci
        </h2>

        <div className="bg-pink-400/80 backdrop-blur rounded-lg p-8 sm:p-10 md:p-12 min-h-64 flex flex-col items-center justify-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white drop-shadow-lg mb-6">
            {sweetMessages[currentMessage]}
          </p>

          <div className="flex gap-4 mt-8">
            {currentMessage > 0 && (
              <button
                onClick={handlePrev}
                className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
              >
                ← Anterior
              </button>
            )}

            <div className="px-4 py-3 bg-white/20 text-white rounded-lg">
              {currentMessage + 1} / {sweetMessages.length}
            </div>

            <button
              onClick={handleNext}
              className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
            >
              Următor →
            </button>
          </div>

          <div className="mt-4 text-sm text-white/90 flex items-center justify-center gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={randomChecked}
                onChange={(e) => setRandomChecked(e.target.checked)}
              />
              Mesaj random
            </label>

            <button
              onClick={applyRandom}
              className="px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/30 transition text-sm"
            >
              {randomMode ? "Anuleaza" : "Aplica"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
