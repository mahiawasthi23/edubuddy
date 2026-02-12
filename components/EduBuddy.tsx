"use client";

import { useEffect, useRef, useState } from "react";
import StartButton from "./StartButton";

type Props = {
  text: string;
  running: boolean;
  onStart: () => void;
  onStop: () => void;
};

export default function EduBuddy({
  text,
  running,
  onStart,
  onStop,
}: Props) {

  const [displayText, setDisplayText] = useState("");
  const [speaking, setSpeaking] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const lastTextRef = useRef("");

  function safeText(t: any): string {
    if (!t) return "";

    let s = String(t);

    s = s.replace(/\b(undefined|null)\b/gi, "");
    s = s.replace(/\s+/g, " ").trim();

    return s;
  }

  useEffect(() => {
    const clean = safeText(text);

    if (!clean || clean === lastTextRef.current) return;

    lastTextRef.current = clean;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    indexRef.current = 0;
    setDisplayText("");
    setSpeaking(true);

    const delay = setTimeout(() => {
      timerRef.current = setInterval(() => {
        const i = indexRef.current;

        if (i >= clean.length) {
          clearInterval(timerRef.current!);
          setSpeaking(false);
          return;
        }

        setDisplayText((p) => p + clean.charAt(i));
        indexRef.current++;

      }, 25);
    }, 50);

    return () => {
      clearTimeout(delay);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text]);

  return (
    <div className="relative z-0">

      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-3xl blur opacity-30"></div>


      {/* Box */}
     <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-5 shadow-xl border">

        {/* Header */}
        <div className="flex items-center gap-4 mb-3">
    


          <div
             className={`
               w-14 h-14 rounded-full
               bg-gradient-to-br from-blue-400 to-purple-500
               flex items-center justify-center
              text-2xl
              shadow-lg
             transition-all
               duration-200
               ${speaking ? "scale-110" : "scale-100"}
            `}
           >
             🤖
          </div>


          <div>
            <h3 className="font-bold text-purple-700 text-lg">
              EduBuddy
            </h3>

            <p className="text-xs text-gray-500">
              {speaking ? "Speaking..." : "Ready to help"}
            </p>
          </div>

        </div>

        {/* MESSAGE */}

          <div className="text-gray-800 leading-relaxed text-sm sm:text-base min-h-[80px] ">

            {displayText}

            {speaking && (
              <span className="animate-pulse text-purple-600 ml-1">|</span>
            )}

          </div>

          {/* MIC */}
          <div className="absolute bottom-0 right-0">

            <StartButton
              running={running}
              onStart={onStart}
              onStop={onStop}
            />

          </div>

        </div>

      </div>
  );
}
