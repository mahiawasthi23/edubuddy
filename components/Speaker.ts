let enabled = true;

export function enableSpeak() {
  enabled = true;
}

export function disableSpeak() {
  enabled = false;
  if (typeof window !== "undefined") {
    speechSynthesis.cancel();
  }
}

export function speak(text: string, onEnd?: () => void) {
  if (typeof window === "undefined") return;
  if (!enabled) return;
  if (!text || !text.trim()) {
    onEnd?.();
    return;
  }

  try {
    const cleanText = text.replace(/\s+/g, " ").trim();

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = /[ऀ-ॿ]/.test(cleanText) ? "hi-IN" : "en-IN";
    utterance.rate = 1.05;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();

    speechSynthesis.speak(utterance);
  } catch {
    onEnd?.();
  }
}


