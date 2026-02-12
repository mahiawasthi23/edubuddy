"use client";

import { useEffect, useRef } from "react";

type Props = {
  active: boolean;
  onText: (text: string) => void;
};

export default function VoiceEngine({ active, onText }: Props) {
  const recRef = useRef<any>(null);
  const bufferRef = useRef("");
  const timerRef = useRef<any>(null);

  const stoppedRef = useRef(false);

  const restartingRef = useRef(false);

  useEffect(() => {
    if (active) {
      startFresh();
    } else {
      fullStop();
    }

    return () => fullStop();
  }, [active]);


  function startFresh() {
    if (recRef.current) return;

    stoppedRef.current = false;
    restartingRef.current = false;

    setTimeout(() => {
      if (!stoppedRef.current) {
        startMic();
      }
    }, 300); 
  }


  function startMic() {
    if (recRef.current) return;

    const Speech =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!Speech) {
      alert("Speech Recognition not supported");
      return;
    }

    const rec = new Speech();

    rec.lang = "en-IN";
    rec.continuous = true;
    rec.interimResults = true;

    rec.onstart = () => {
      console.log("🎙️ Mic started");
      restartingRef.current = false;
    };

    rec.onresult = (e: any) => {
      let finalText = "";

      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalText += e.results[i][0].transcript + " ";
        }
      }

      if (finalText.trim()) {
        bufferRef.current += finalText;
        bufferRef.current = bufferRef.current.replace(/\s+/g, " ").trim();

        waitBeforeSend();
      }
    };

    rec.onerror = (e: any) => {
      console.warn("Mic error:", e);

      if (!stoppedRef.current && active && !restartingRef.current) {
        restartMic();
      }
    };

    rec.onend = () => {
      console.log("🛑 Mic ended");

      recRef.current = null;

      if (!stoppedRef.current && active && !restartingRef.current) {
        restartMic();
      }
    };

    recRef.current = rec;

    try {
      rec.start();
    } catch (err) {
      console.error("Start failed:", err);
    }
  }

  function restartMic() {
    if (restartingRef.current) return;

    restartingRef.current = true;

    stopOnly();

    setTimeout(() => {
      if (active && !stoppedRef.current) {
        startMic();
      }
    }, 500);
  }

  function waitBeforeSend() {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const text = cleanText(bufferRef.current);

      if (text) {
        onText(text);
      }

      bufferRef.current = "";
    }, 500);
  }

  function cleanText(text: string) {
    const words = text.split(" ");
    const result: string[] = [];

    for (let i = 0; i < words.length; i++) {
      if (i === 0 || words[i] !== words[i - 1]) {
        result.push(words[i]);
      }
    }

    return result.join(" ");
  }


  function stopOnly() {
    if (recRef.current) {
      try {
        recRef.current.onresult = null;
        recRef.current.onerror = null;
        recRef.current.onend = null;

        recRef.current.stop();
      } catch {}

      recRef.current = null;
    }
  }

  function fullStop() {
    stoppedRef.current = true;
    restartingRef.current = false;

    stopOnly();

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    bufferRef.current = "";

    console.log("⛔ Mic stopped cleanly");
  }

  return null;
}
